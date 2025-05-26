// ContactUs.tsx
import { Mail, Phone, Instagram, Music2 } from 'lucide-react';
import { motion } from 'framer-motion';

const contactItems = [
  {
    label: 'Email',
    icon: <Mail className="w-6 h-6" />,
    value: 'fankoskart@gmail.com',
    
  },
  {
    label: 'Phone',
    icon: <Phone className="w-6 h-6" />,
    value: '+389 78 524 931',
    
  },
  {
    label: 'Instagram',
    icon: <Instagram className="w-6 h-6" />,
    value: '@art.galaxy',
    href: 'https://instagram.com/fankoskart',
  },
  {
    label: 'TikTok',
    icon: <Music2 className="w-6 h-6" />,
    value: '@arttok',
    href: 'https://tiktok.com/@fankoskart',
  },
];

export default function ContactUs() {
  return (
    <motion.div
      className="min-h-screen flex flex-col w-full items-center justify-center 0 p-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl text-white text-center font-bold mb-8">
        Let&apos;s Connect 🎨
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {contactItems.map((item, idx) => (
          <motion.a
            key={idx}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/90 shadow-lg hover:shadow-xl backdrop-blur-lg border border-white/30 hover:bg-white/80 text-center"
          >
            <div className="text-rose-300 mb-2">{item.icon}</div>
            <div className="font-medium text-rose-300">{item.label}</div>
            <div className="text-sm text-rose-300">{item.value}</div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
