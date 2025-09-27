import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ShadcnDemo() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">shadcn/ui Components Demo</h1>
        <p className="text-lg text-muted-foreground">
          Ready-made responsive components for your spa business
        </p>
      </div>

      {/* Button Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>
            Responsive buttons with different variants and sizes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </CardContent>
      </Card>

      {/* Input Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Inputs</CardTitle>
          <CardDescription>
            Form inputs with consistent styling and responsiveness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="Enter your phone" 
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Spa Services</CardTitle>
            <CardDescription>
              Relaxing and rejuvenating treatments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Professional spa services designed to help you unwind and feel your best.
            </p>
            <Button className="w-full mt-4">Book Service</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wellness Packages</CardTitle>
            <CardDescription>
              Comprehensive wellness experiences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Complete wellness packages combining multiple treatments for maximum benefit.
            </p>
            <Button className="w-full mt-4" variant="outline">View Packages</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membership</CardTitle>
            <CardDescription>
              Exclusive member benefits and discounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Join our membership program for special rates and priority booking.
            </p>
            <Button className="w-full mt-4" variant="secondary">Join Now</Button>
          </CardContent>
        </Card>
      </div>

      {/* Responsive Layout Example */}
      <Card>
        <CardHeader>
          <CardTitle>Responsive Design</CardTitle>
          <CardDescription>
            Components automatically adapt to different screen sizes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Services</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">5★</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
