
import React from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Small Business Owner",
    avatar: "/placeholder.svg",
    quote: "Expense Tracker has transformed how I manage my business finances. I can easily track all expenses and make better financial decisions.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Freelance Designer",
    avatar: "/placeholder.svg",
    quote: "As a freelancer, keeping track of expenses was always a struggle. This app made it simple and intuitive. I can focus more on my work now!",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Professional",
    avatar: "/placeholder.svg",
    quote: "The visual analytics helped me understand my spending patterns and cut unnecessary expenses. I've saved over $300 monthly since using this app.",
    rating: 4
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Recent Graduate",
    avatar: "/placeholder.svg",
    quote: "Perfect for someone just starting their financial journey. The budget features helped me pay off my student loans faster than expected.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join thousands of satisfied users who have transformed their financial habits
        </p>
      </div>

      <Carousel className="max-w-4xl mx-auto">
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="md:basis-1/1 lg:basis-1/1 py-6">
              <Card className="border-none shadow-lg hover-scale">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                      <Avatar className="h-12 w-12 border-2 border-primary/10">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote className="mt-4 text-muted-foreground italic">
                    "{testimonial.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4 gap-2">
          <CarouselPrevious className="relative static transform-none" />
          <CarouselNext className="relative static transform-none" />
        </div>
      </Carousel>
    </section>
  );
};

export default Testimonials;
