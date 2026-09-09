import { motion } from "framer-motion";

export default function MemoryTimeline({ timeline }) {
  return (
    <section className="py-12">
      <h2 className="text-4xl font-handwritten mb-16 text-center">A Few Moments Worth Remembering ✨</h2>

      <div className="relative max-w-3xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform md:-translate-x-1/2 rounded-full" />

        <div className="space-y-12 md:space-y-24">
          {timeline.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`relative flex items-center flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Dot */}
              <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 shadow-[0_0_0_4px_white,0_0_0_6px_#ff6b6b] z-10" />

              {/* Content */}
              <div className={`w-full pl-12 md:pl-0 md:w-1/2 flex ${index % 2 === 0 ? "md:justify-start md:pl-12" : "md:justify-end md:pr-12"}`}>
                <div className="bg-white p-4 rounded-xl scrapbook-shadow relative group hover:-translate-y-2 transition-transform duration-300 w-full max-w-sm">
                  <div className="absolute -top-3 -left-3 bg-accent text-gray-800 font-bold px-3 py-1 rounded-lg transform -rotate-6 z-10 shadow-sm border border-yellow-200">
                    {item.year}
                  </div>
                  
                  <img src={item.src} alt={item.year} className="w-full h-48 object-cover rounded-lg mb-4" />
                  
                  <p className="font-handwritten text-lg text-center text-gray-700">{item.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
