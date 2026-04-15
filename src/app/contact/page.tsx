"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/8801234567890?text=Hi%2C%20I%20have%20a%20question%20about%20SmartEyeLook", "_blank");
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-foreground mb-2">Contact Us</h1>
      <p className="text-muted-foreground mb-10">We'd love to hear from you</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input placeholder="Your Name" required />
            <Input type="email" placeholder="Email Address" required />
          </div>
          <Input placeholder="Subject" required />
          <Textarea placeholder="Your Message" rows={5} required />
          <Button type="submit" size="lg" className="w-full">Send Message</Button>
        </form>

        <div className="space-y-6">
          <div className="p-6 border rounded-lg bg-card space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground text-sm">Phone</p>
                <p className="text-muted-foreground text-sm">+880 1234-567890</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground text-sm">Email</p>
                <p className="text-muted-foreground text-sm">info@smarteyelook.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground text-sm">Address</p>
                <p className="text-muted-foreground text-sm">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          <Button onClick={handleWhatsApp} size="lg" className="w-full bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground gap-2">
            <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
