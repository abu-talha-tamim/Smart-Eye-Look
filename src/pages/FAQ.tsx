import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How do I create a biodata?", a: "Click on 'Create your biodata' button on the homepage or register page. Fill in the required information step by step and submit." },
  { q: "Is OrdhekDeen free to use?", a: "Yes, creating a biodata and searching for profiles is completely free. Some premium features may require a subscription." },
  { q: "How is my privacy protected?", a: "Your personal contact information is hidden until both parties express mutual interest. We never share your data with third parties." },
  { q: "Can I edit my biodata after submission?", a: "Yes, you can update your biodata anytime from your profile dashboard after logging in." },
  { q: "How does the interest system work?", a: "When you find a suitable match, you can send an interest. If they accept, both parties can see each other's contact information." },
  { q: "Is guardian/family involvement required?", a: "We strongly encourage guardian involvement as per Islamic guidelines, but it's not mandatory for registration." },
  { q: "How are profiles verified?", a: "Our team manually reviews each profile for authenticity. Verified profiles get a badge on their biodata." },
  { q: "Can I delete my account?", a: "Yes, you can request account deletion from your profile settings or by contacting our support team." },
];

const FAQ = () => {
  return (
    <main className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">Frequently Asked <span className="gradient-text">Questions</span></h1>
        <p className="text-muted-foreground text-center text-sm mb-10">Find answers to common questions</p>

        <div className="bg-card rounded-xl border border-border p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </main>
  );
};

export default FAQ;
