import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, DollarSign, TrendingUp, Star } from 'lucide-react';

const counters = [
  {
    icon: Users,
    value: 300,
    suffix: '',
    label: 'Empresas confían en nosotros'
  },
  {
    icon: DollarSign,
    value: 2100,
    suffix: 'M',
    label: 'En ventas gestionadas'
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: '%',
    label: 'Tasa de retención'
  },
  {
    icon: Star,
    value: 4.9,
    suffix: '',
    label: 'Calificación promedio'
  }
];

const Counter = ({ value, suffix, duration = 4 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    const end = value;
    const increment = end / (duration * 60);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 1000 / 60);
    
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  const formatNumber = (num) => {
    if (Number.isInteger(value)) {
      return Math.floor(num).toLocaleString('es-CL');
    }
    return num.toFixed(1);
  };

  return (
    <span ref={ref}>
      {formatNumber(count)}{suffix}
    </span>
  );
};

const Counters = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-primary/80 relative z-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {counters.map((counter, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.3,
                  type: "spring",
                  stiffness: 60
                }}
                whileHover={{ scale: 1.1 }}
                className="text-center group cursor-pointer"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1.2 }}
                  className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors"
                >
                  <counter.icon className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div 
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="text-2xl md:text-3xl font-bold text-white mb-2"
                >
                  <Counter value={counter.value} suffix={counter.suffix} />
                  {counter.icon === Star && (
                    <Star className="inline-block w-6 h-6 ml-1 fill-yellow-400 text-yellow-400" />
                  )}
                </motion.div>
                <p className="text-white/80 text-sm">
                  {counter.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Counters;