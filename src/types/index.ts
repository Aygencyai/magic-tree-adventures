export interface Character {
  name: string;
  role: string;
  description: string;
  chakra?: string;
  animation: "vibrate" | "bounce" | "glow" | "mist" | "flutter";
}

export interface Chakra {
  name: string;
  sanskrit: string;
  colour: string;
  tailwindClass: string;
  location: string;
  meaning: string;
  childFriendly: string;
  storyConnection: string;
  tryThis: string;
  featured?: boolean;
}

export interface Creator {
  name: string;
  role: string;
  bio: string;
}

export interface NavLink {
  label: string;
  href: string;
}
