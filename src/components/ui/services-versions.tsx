import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TiltCard } from '@/components/ui/tilt-card';
import { Sparkles, Plus, Minus } from 'lucide-react';
import { Pointer } from '@/components/ui/pointer';

export function V3AccordionCard({ service }: { service: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <TiltCard 
        className="group relative rounded-3xl overflow-hidden bg-transparent border border-[hsl(var(--border))] lg:hover:border-[hsl(var(--accent))] shadow-lg lg:hover:shadow-2xl flex items-center justify-center cursor-pointer transition-colors duration-500 aspect-video w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <img src={service.image} alt={service.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] lg:group-hover:scale-[1.05]" />
        </div>
        
        <Pointer>
          <motion.div 
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-white shadow-[0_4px_16px_hsl(var(--accent)/0.5)] backdrop-blur-xl border border-white/20"
            animate={{ scale: [1, 1.1, 1], y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "translateZ(60px)" }}
          >
            <Sparkles className="h-4 w-4 fill-white/80" />
          </motion.div>
        </Pointer>
      </TiltCard>
      
      <div className="bg-[hsl(var(--background))] rounded-2xl border border-[hsl(var(--border))] p-4 shadow-sm transition-colors lg:hover:border-[hsl(var(--accent))] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <button className="flex items-center justify-between w-full text-left">
          <div>
            <h3 className="font-bold font-serif text-lg text-[hsl(var(--foreground))]">{service.title}</h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1 line-clamp-1">{service.description}</p>
          </div>
          <div className="bg-muted p-2 rounded-full shrink-0 text-accent transition-colors">
            {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </div>
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-[hsl(var(--border))]">
                <div className="h-[100px] overflow-y-auto custom-scrollbar pr-2">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                    {service.list?.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                        <div className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


