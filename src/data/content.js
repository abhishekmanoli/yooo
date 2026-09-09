// 🎂 Centralized Data Configuration
// You can change all text, captions, and image assignments here.

export const content = {
  // Basic Info
  name: "Bro", // e.g. "John" or "Bro"
  age: "20",
  
  // Images Mapping
  // Since the original images had UUID names, we've mapped them randomly here.
  // Replace these with the actual descriptive filenames later if you rename them.
  images: {
    hero: "/images/27c992ad-09ad-4ce2-8ed6-7666b41f8882.jpeg",
    childhood: "/images/02303a84-08f1-4b7a-8c48-9fb27ce4b5bf.jpeg",
    current: "/images/2a67f901-61fd-4206-8a8d-5505c06755bc.jpeg",
    
    gallery: [
      { src: "/2.jpeg", caption: "The innocent era 😂" },
      { src: "/3.jpeg", caption: "Peak childhood." },
      { src: "/4.jpeg", caption: "Same person. Different vibes." },
      { src: "/images/2d886214-df1c-4c3a-a6d5-71ccc94d2bca.jpeg", caption: "Certified chaos." },
      { src: "/images/879aeea3-675f-468c-ac95-a1d66f9d1c8e.jpeg", caption: "How did we get here? 😭" },
    ],
    
    eras: [
      { id: "spider", title: "THE SPIDER-MAN ERA 🕷️", src: "/images/87afa489-6248-4e03-9985-8f5a250fbe76.jpeg", desc: "Bro really thought he was Spider-Man." },
      { id: "bee", title: "THE BEE ERA 🐝", src: "/images/9886484f-1085-45b2-8fe5-9089a7e4d650.jpeg", desc: "Buzzing around causing trouble." },
      { id: "biker", title: "THE BIKER ERA 🏍️", src: "/images/9c44aff2-204e-4eb9-b9d8-7e31475fa9ac.jpeg", desc: "Born to ride." },
      { id: "pixel", title: "THE PIXEL ERA 👾", src: "/images/a5f4c2b6-8265-402c-b89a-6b140a485b7d.jpeg", desc: "8-bit main character." },
      { id: "pro", title: "THE PROFESSIONAL ERA 🕶️", src: "/images/d7404430-97f8-4122-88cb-363935bbd661.jpeg", desc: "Looking sharp, probably scheming." },
    ],
    
    timeline: [
      { year: "2010", text: "Tiny Human 👶", src: "/images/e0563db4-e596-46cd-8998-a6fe6e2a6e05.jpeg" },
      { year: "2015", text: "Chaos Unlocked 😂", src: "/images/e32f9dc3-0eb5-49b1-b366-0399da221451.jpeg" },
      { year: "2019", text: "Character Development", src: "/images/fd0fee99-877d-4b7f-8a18-165e070b607c.jpeg" },
      { year: "2023", text: "New Adventures", src: "/images/c0c2be00-6f50-4a99-b40c-244396e217d1.jpeg" },
      { year: "2026", text: "Main Character Energy 😎", src: "/images/02303a84-08f1-4b7a-8c48-9fb27ce4b5bf.jpeg" },
    ]
  },

  // Game/Quiz Questions
  quiz: [
    {
      question: "What's his default mode?",
      options: ["😴 Sleep", "😂 Chaos", "🗿 Serious", "🍕 Food"],
      answer: "😂 Chaos"
    },
    {
      question: "Pick his ultimate superpower.",
      options: ["Invisibility", "Sleeping anywhere", "Unlimited rizz", "Eating without gaining weight"],
      answer: "Sleeping anywhere"
    },
    {
      question: "Which version of him is the most dangerous?",
      options: ["Hungry", "Just woke up", "Gaming", "Spider-Man era"],
      answer: "Spider-Man era"
    }
  ],

  // Gifts
  gifts: [
    { text: "Unlimited good vibes ✨", icon: "🎁", isSecret: false },
    { text: "A lifetime supply of stupid jokes 😂", icon: "🎁", isSecret: false },
    { text: "Good health, good people & good memories ❤️", icon: "🎁", isSecret: false },
    { text: "YOU FOUND THE SECRET: Free Pizza pass 🍕", icon: "🎁", isSecret: true },
  ],

  // Birthday Letter
  letter: {
    greeting: "Dear [NAME],",
    title: "Happy Birthday! ❤️",
    body: `Another year, another collection of memories...
    
I wanted to make something special for you to remind you of all the eras, all the vibes, and just how much of a main character you are.

Keep being awesome, keep causing (a little bit of) chaos, and here's to another amazing year ahead.`,
    closing: "Stay awesome. Always."
  }
};
