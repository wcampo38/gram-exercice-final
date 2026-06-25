import Image from "next/image";
import Link from "next/link";

type HomeType = {
  size?: number;
  color?: "dark" | "light";
};

export default function Home({ size = 1720, color = "dark" }: HomeType) {
  return (
      <Image
        src={color == "dark" ? "/home.svg" : "/home-light.svg"}
        alt="home"
        width="24"
        height="24"
        style={{ width: size }}
      />
  );
}