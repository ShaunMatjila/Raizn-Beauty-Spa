// app/api/debug/services/route.js
import { NextResponse } from "next/server";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../../../lib/firebase";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceTitle = searchParams.get('title');
    const category = searchParams.get('category');
    
    let servicesQuery = collection(db, "services");
    
    if (serviceTitle) {
      // Search by specific service title
      servicesQuery = query(
        collection(db, "services"),
        where("title", "==", serviceTitle)
      );
    } else if (category) {
      // Search by category
      servicesQuery = query(
        collection(db, "services"),
        where("category", "==", category)
      );
    } else {
      // Get all services
      servicesQuery = query(
        collection(db, "services"),
        orderBy("title")
      );
    }
    
    const servicesSnapshot = await getDocs(servicesQuery);
    const services = [];
    
    servicesSnapshot.forEach((doc) => {
      services.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt,
      });
    });
    
    return NextResponse.json({
      success: true,
      count: services.length,
      data: services,
      query: {
        title: serviceTitle,
        category: category,
        hasFilters: !!(serviceTitle || category)
      }
    });
    
  } catch (error) {
    console.error("Error debugging services:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action } = body;
    
    if (action === "check") {
      // Check if services exist and return summary
      const servicesSnapshot = await getDocs(collection(db, "services"));
      const services = [];
      
      servicesSnapshot.forEach((doc) => {
        services.push({
          id: doc.id,
          title: doc.data().title,
          category: doc.data().category,
          bookings: doc.data().bookings || 0,
        });
      });
      
      // Group by category
      const categorySummary = {};
      services.forEach(service => {
        if (!categorySummary[service.category]) {
          categorySummary[service.category] = [];
        }
        categorySummary[service.category].push(service);
      });
      
      return NextResponse.json({
        success: true,
        totalServices: services.length,
        categories: Object.keys(categorySummary),
        categorySummary,
        message: "Service database check completed"
      });
    }
    
    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
    
  } catch (error) {
    console.error("Error in services debug POST:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
