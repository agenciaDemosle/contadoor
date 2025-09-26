import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const ProgressBar = () => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2"
      >
        <div className="relative w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute h-full bg-primary rounded-full"
          />
        </div>
        <span className="text-black text-xs flex items-center gap-1">
          Tu reunión está agendada
          <CheckCircle className="w-3 h-3 text-green-600" />
        </span>
      </motion.div>
    </div>
  );
};

export default ProgressBar;