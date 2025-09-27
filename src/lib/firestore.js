// lib/firestore.js
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  getDoc,
  runTransaction,
} from "firebase/firestore";
import { db } from "./firebase";

// Collections
export const COLLECTIONS = {
  BOOKINGS: "bookings",
  CUSTOMERS: "customers",
  SERVICES: "services",
  SETTINGS: "settings",
};

// Invoice numbering functions
export const invoiceService = {
  // Get the next invoice number
  async getNextInvoiceNumber() {
    try {
      const settingsRef = doc(db, COLLECTIONS.SETTINGS, "invoice_counter");
      const settingsDoc = await getDoc(settingsRef);
      
      if (settingsDoc.exists()) {
        const currentNumber = settingsDoc.data().nextInvoiceNumber || 1;
        return currentNumber;
      } else {
        // Initialize with 1 if no counter exists
        return 1;
      }
    } catch (error) {
      console.error("Error getting next invoice number:", error);
      return 1; // Fallback to 1
    }
  },

  // Increment and get the next invoice number
  async incrementInvoiceNumber() {
    try {
      const settingsRef = doc(db, COLLECTIONS.SETTINGS, "invoice_counter");
      
      const result = await runTransaction(db, async (transaction) => {
        const settingsDoc = await transaction.get(settingsRef);
        
        if (settingsDoc.exists()) {
          const currentNumber = settingsDoc.data().nextInvoiceNumber || 1;
          const nextNumber = currentNumber + 1;
          
          transaction.update(settingsRef, {
            nextInvoiceNumber: nextNumber,
            updatedAt: Timestamp.now(),
          });
          
          return currentNumber; // Return the current number (this booking's invoice number)
        } else {
          // Initialize counter
          transaction.set(settingsRef, {
            nextInvoiceNumber: 2, // Next number will be 2
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
          });
          
          return 1; // First invoice number
        }
      });
      
      return result;
    } catch (error) {
      console.error("Error incrementing invoice number:", error);
      // Fallback: generate a timestamp-based number
      return Date.now();
    }
  },

  // Format invoice number with leading zeros
  formatInvoiceNumber(number) {
    return number.toString().padStart(3, '0');
  }
};

// Booking functions
export const bookingService = {
  // Create a new booking
  async create(bookingData) {
    try {
      // Generate invoice number
      const invoiceNumber = await invoiceService.incrementInvoiceNumber();
      const formattedInvoiceNumber = invoiceService.formatInvoiceNumber(invoiceNumber);
      
      const booking = {
        ...bookingData,
        invoiceNumber: formattedInvoiceNumber,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        status: "pending",
      };

      const docRef = await addDoc(
        collection(db, COLLECTIONS.BOOKINGS),
        booking
      );
      
      // Return both the Firestore ID and the invoice number
      return { 
        success: true, 
        id: docRef.id, 
        invoiceNumber: formattedInvoiceNumber,
        data: { ...booking, id: docRef.id }
      };
    } catch (error) {
      console.error("Error creating booking:", error);
      return { success: false, error: error.message };
    }
  },

  // Get all bookings
  async getAll() {
    try {
      const q = query(
        collection(db, COLLECTIONS.BOOKINGS),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const bookings = [];

      querySnapshot.forEach((doc) => {
        bookings.push({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore Timestamps to Date objects
          date: doc.data().date?.toDate?.() || doc.data().date,
          createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
          updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt,
        });
      });

      // Sort by date descending, then by createdAt descending
      bookings.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateB.getTime() !== dateA.getTime()) {
          return dateB.getTime() - dateA.getTime();
        }
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      return { success: true, data: bookings };
    } catch (error) {
      console.error("Error getting bookings:", error);
      return { success: false, error: error.message };
    }
  },

  // Get bookings by date
  async getByDate(date) {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const q = query(
        collection(db, COLLECTIONS.BOOKINGS),
        where("date", ">=", Timestamp.fromDate(startOfDay)),
        where("date", "<=", Timestamp.fromDate(endOfDay))
      );

      const querySnapshot = await getDocs(q);
      const bookings = [];

      querySnapshot.forEach((doc) => {
        bookings.push({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate?.() || doc.data().date,
          createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
          updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt,
        });
      });

      // Sort by date ascending
      bookings.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      return { success: true, data: bookings };
    } catch (error) {
      console.error("Error getting bookings by date:", error);
      return { success: false, error: error.message };
    }
  },

  // Get today's bookings
  async getToday() {
    const today = new Date();
    return await this.getByDate(today);
  },

  // Update booking status
  async updateStatus(bookingId, status) {
    try {
      const bookingRef = doc(db, COLLECTIONS.BOOKINGS, bookingId);
      await updateDoc(bookingRef, {
        status,
        updatedAt: Timestamp.now(),
      });

      return { success: true };
    } catch (error) {
      console.error("Error updating booking status:", error);
      return { success: false, error: error.message };
    }
  },

  // Delete booking
  async delete(bookingId) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.BOOKINGS, bookingId));
      return { success: true };
    } catch (error) {
      console.error("Error deleting booking:", error);
      return { success: false, error: error.message };
    }
  },

  // Get booking by ID
  async getById(bookingId) {
    try {
      const docRef = doc(db, COLLECTIONS.BOOKINGS, bookingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          success: true,
          data: {
            id: docSnap.id,
            ...data,
            date: data.date?.toDate?.() || data.date,
            createdAt: data.createdAt?.toDate?.() || data.createdAt,
            updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
          },
        };
      } else {
        return { success: false, error: "Booking not found" };
      }
    } catch (error) {
      console.error("Error getting booking:", error);
      return { success: false, error: error.message };
    }
  },

  // Update booking
  async update(bookingId, updateData) {
    try {
      const bookingRef = doc(db, COLLECTIONS.BOOKINGS, bookingId);
      
      // Ensure invoice number is never overwritten during updates
      const { invoiceNumber, ...safeUpdateData } = updateData;
      
      const dataToUpdate = {
        ...safeUpdateData,
        updatedAt: Timestamp.now(),
      };

      // Convert date string to Timestamp if provided
      if (updateData.date && typeof updateData.date === "string") {
        dataToUpdate.date = Timestamp.fromDate(new Date(updateData.date));
      }

      await updateDoc(bookingRef, dataToUpdate);

      return { success: true, data: dataToUpdate };
    } catch (error) {
      console.error("Error updating booking:", error);
      return { success: false, error: error.message };
    }
  },
};

// Customer functions
export const customerService = {
  // Create or update customer
  async createOrUpdate(customerData) {
    try {
      const { email } = customerData;

      // Check if customer exists
      const q = query(
        collection(db, COLLECTIONS.CUSTOMERS),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Update existing customer
        const customerDoc = querySnapshot.docs[0];
        await updateDoc(customerDoc.ref, {
          ...customerData,
          updatedAt: Timestamp.now(),
        });
        return { success: true, id: customerDoc.id, data: customerData };
      } else {
        // Create new customer
        const customer = {
          ...customerData,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        };

        const docRef = await addDoc(
          collection(db, COLLECTIONS.CUSTOMERS),
          customer
        );
        return { success: true, id: docRef.id, data: customer };
      }
    } catch (error) {
      console.error("Error creating/updating customer:", error);
      return { success: false, error: error.message };
    }
  },

  // Get all customers
  async getAll() {
    try {
      const q = query(
        collection(db, COLLECTIONS.CUSTOMERS),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const customers = [];

      querySnapshot.forEach((doc) => {
        customers.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
          updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt,
        });
      });

      return { success: true, data: customers };
    } catch (error) {
      console.error("Error getting customers:", error);
      return { success: false, error: error.message };
    }
  },

  // Get customer by ID
  async getById(customerId) {
    try {
      const docRef = doc(db, COLLECTIONS.CUSTOMERS, customerId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          success: true,
          data: {
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || data.createdAt,
            updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
          },
        };
      } else {
        return { success: false, error: "Customer not found" };
      }
    } catch (error) {
      console.error("Error getting customer:", error);
      return { success: false, error: error.message };
    }
  },

  // Update customer
  async update(customerId, customerData) {
    try {
      const customerRef = doc(db, COLLECTIONS.CUSTOMERS, customerId);
      const updateData = {
        ...customerData,
        updatedAt: Timestamp.now(),
      };

      await updateDoc(customerRef, updateData);

      return { success: true, data: updateData };
    } catch (error) {
      console.error("Error updating customer:", error);
      return { success: false, error: error.message };
    }
  },

  // Delete customer
  async delete(customerId) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.CUSTOMERS, customerId));
      return { success: true };
    } catch (error) {
      console.error("Error deleting customer:", error);
      return { success: false, error: error.message };
    }
  },
};

// Analytics functions
export const analyticsService = {
  // Get booking stats
  async getBookingStats() {
    try {
      const bookingsResult = await bookingService.getAll();
      if (!bookingsResult.success) {
        return bookingsResult;
      }

      const bookings = bookingsResult.data;
      const today = new Date();
      const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      // Filter today's bookings
      const todayBookings = bookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return bookingDate.toDateString() === today.toDateString();
      });

      // Filter this month's bookings
      const monthlyBookings = bookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return bookingDate >= thisMonth;
      });

      // Calculate revenue
      const todayRevenue = todayBookings.reduce((sum, booking) => {
        const price = parseFloat(booking.price?.replace(/[^0-9.-]/g, "") || 0);
        return sum + price;
      }, 0);

      const monthlyRevenue = monthlyBookings.reduce((sum, booking) => {
        const price = parseFloat(booking.price?.replace(/[^0-9.-]/g, "") || 0);
        return sum + price;
      }, 0);

      // Service popularity
      const serviceCount = {};
      monthlyBookings.forEach((booking) => {
        serviceCount[booking.service] =
          (serviceCount[booking.service] || 0) + 1;
      });

      const popularServices = Object.entries(serviceCount)
        .map(([service, count]) => ({ service, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      return {
        success: true,
        data: {
          todayBookings: todayBookings.length,
          monthlyBookings: monthlyBookings.length,
          todayRevenue,
          monthlyRevenue,
          popularServices,
          pendingBookings: bookings.filter((b) => b.status === "pending")
            .length,
        },
      };
    } catch (error) {
      console.error("Error getting booking stats:", error);
      return { success: false, error: error.message };
    }
  },
};
