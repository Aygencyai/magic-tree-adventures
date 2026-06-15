export const SITE_NAME = "The Magic Tree Adventures";
export const SITE_TAGLINE = "Journey to the Crystal Mountain";
export const SITE_DESCRIPTION =
  "A magical story about finding your voice, discovering your inner light, and the adventure of a lifetime.";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "The Chakras", href: "/chakras" },
  { label: "About", href: "/about" },
] as const;

export const CHARACTERS = [
  {
    name: "Rory",
    role: "The brave-hearted dreamer",
    description:
      "Shy of most things, but so wanting a brave heart to help him find his voice and help others. When his words get stuck, he lets out a roar.",
    chakra: "throat",
    animation: "vibrate" as const,
  },
  {
    name: "Riley",
    role: "The fearless adventurer",
    description:
      "Funny and fearless, Riley swings from the highest branches and charges headfirst into every adventure. Her singing can calm even the stormiest seas.",
    animation: "bounce" as const,
  },
  {
    name: "Tilly",
    role: "The cool protector",
    description:
      "The older sister who is the cool teenager, but so loves to have fun too. She wraps a protective arm around her siblings and always has a clever solution.",
    animation: "glow" as const,
  },
  {
    name: "Alina",
    role: "Angel of the voices",
    description:
      "An angel with wings of softest blue. She hears wishes through the magic tree and guides those who need to find their voice.",
    animation: "mist" as const,
  },
  {
    name: "Gino",
    role: "The gentle lion",
    description:
      "A big, shaggy lion with tiny wings sprouting from his fur. His roar scares everyone, but all he wants is to be understood and make friends.",
    animation: "flutter" as const,
  },
  {
    name: "Ari",
    role: "Angel of the Crystal Mountain",
    description:
      "An angel with shiny rainbow wings who waits at the base of the Crystal Mountain. He knows every child by name and wraps them in a love that hugs their hearts.",
    animation: "glow" as const,
  },
] as const;

export const CHAKRAS = [
  {
    name: "Root",
    sanskrit: "Muladhara",
    colour: "#E05555",
    tailwindClass: "bg-chakra-root",
    location: "Bottom of the spine",
    meaning: "I am safe",
    childFriendly:
      "This is your \"I am safe\" spot. It helps you feel strong, like a big tree with deep roots in the ground. When you feel loved, hugged on the inside and ready for anything, your root chakra is happy.",
    storyConnection:
      "The old apple tree at the bottom of the garden, with its deep roots and knobbly trunk, represents the root chakra — the feeling of home, safety, and belonging.",
    tryThis:
      "Stand with your feet on the ground. Imagine you are a tree with roots growing deep into the earth. Take three deep breaths and feel how strong and safe you are.",
  },
  {
    name: "Sacral",
    sanskrit: "Svadhisthana",
    colour: "#F0923E",
    tailwindClass: "bg-chakra-sacral",
    location: "Below the belly button",
    meaning: "I can create",
    childFriendly:
      "This is your \"fun and happy feelings\" spot. It helps you make things, love yourself, and feel you can do anything. When you draw a cool picture, tell a funny story, or feel proud of something you've done, your sacral chakra is smiling.",
    storyConnection:
      "Riley's fearless creativity and funny stories come from her sacral chakra — the joyful energy that makes adventures possible.",
    tryThis:
      "Think of something you made that you are proud of — a drawing, a story, a sandcastle. Put your hands on your tummy and feel that warm, happy glow.",
  },
  {
    name: "Solar Plexus",
    sanskrit: "Manipura",
    colour: "#F0D03E",
    tailwindClass: "bg-chakra-solar",
    location: "Belly area",
    meaning: "I can do it",
    childFriendly:
      "This is your \"I can do it\" spot. It gives you confidence and makes you feel proud when you try new things. When you climb a high slide or learn something new, your solar plexus is cheering for you.",
    storyConnection:
      "The golden hills of Angelica glow with the warm energy of the solar plexus — the confidence the children need to begin their journey.",
    tryThis:
      "Think of a time you did something brave. Put your hand on your tummy and say: \"I can do it!\" Feel your inner sunshine grow brighter.",
  },
  {
    name: "Heart",
    sanskrit: "Anahata",
    colour: "#5DBB63",
    tailwindClass: "bg-chakra-heart",
    location: "Centre of the chest",
    meaning: "I am loved",
    childFriendly:
      "This is your \"love\" spot. It helps you care about others, love and hug your family and friends, and feel happy when someone is kind. When you share a toy or say something nice, your heart chakra is glowing.",
    storyConnection:
      "Tilly's protective love for her siblings, and the way Alina places her hand over Rory's heart, both come from the green, glowing energy of the heart chakra.",
    tryThis:
      "Put your hand on your heart. Can you feel it beating? Think of someone you love very much. Feel the warmth spread through your chest — that is your heart chakra saying hello.",
  },
  {
    name: "Throat",
    sanskrit: "Vishuddha",
    colour: "#5B8FD4",
    tailwindClass: "bg-chakra-throat",
    location: "Throat",
    meaning: "I can speak my truth",
    childFriendly:
      "This is your \"talk and sing\" spot. It helps you feel safe to say what you feel and share your ideas, which is why shy Rory so wanted to find it. When you say \"thank you\" or sing your favourite song, your throat chakra feels strong and happy.",
    storyConnection:
      "This is Rory's chakra — the one he journeys to the Crystal Mountain to find. The blue crystal apple he picks from the tree in the crystal cave helps him find his voice and be understood.",
    tryThis:
      "Take a deep breath and hum your favourite song. Feel the vibration in your throat. Now say something kind to yourself. That is your throat chakra working.",
    featured: true,
  },
  {
    name: "Third Eye",
    sanskrit: "Ajna",
    colour: "#8B5DC8",
    tailwindClass: "bg-chakra-third-eye",
    location: "Middle of the forehead",
    meaning: "I can see clearly",
    childFriendly:
      "This is your \"imagination\" spot. It helps you think of big ideas and see and understand things clearly. When you figure out how to solve a problem, your third eye is working.",
    storyConnection:
      "Alina, the angel of voices, uses her third eye chakra to hear wishes through the magic tree and see right into Rory's heart.",
    tryThis:
      "Close your eyes and imagine your favourite place. What does it look like? What can you hear? That is your third eye — your imagination — painting a picture inside your mind.",
  },
  {
    name: "Crown",
    sanskrit: "Sahasrara",
    colour: "#D4B8F0",
    tailwindClass: "bg-chakra-crown",
    location: "Top of the head",
    meaning: "I am connected",
    childFriendly:
      "This is your \"connection\" spot. It helps you feel part of something big, like nature, the stars, or even dreams. When you feel peaceful looking at the sky or a rainbow, your crown chakra is shining.",
    storyConnection:
      "The top of Crystal Mountain, where Angel Ari waits and where the children feel love surrounding them — a love that hugs their hearts — is where the crown chakra energy lives.",
    tryThis:
      "Look up at the sky. Imagine a soft, glowing light above your head connecting you to the stars, the trees, and everyone you love. Take a deep breath and feel how peaceful that is.",
  },
] as const;

export const CREATORS = [
  {
    name: "Jools Abrams",
    role: "Author",
    bio: "An award-winning author of nearly fifty books for children and adults. With a background in teaching and a passion for storytelling and adventure, she brings Poppa Stan's magical tales to life on the page.",
  },
  {
    name: "Sara Oberman Babai",
    role: "Spiritual Guide",
    bio: "A grandmother, clairvoyant medium, and psychic who spent over thirty years guiding others to trust their intuition. She wove the wisdom of the chakras into gentle, magical tales that inspire children to see the world with love and wonder.",
  },
  {
    name: "Alejandra Barajas",
    role: "Illustrator",
    bio: "A Mexican illustrator and Fine Arts graduate from the University of Guanajuato. She creates imaginative worlds that express deep emotions and connect with viewers, bringing the land of Angelica to vivid life.",
  },
] as const;
