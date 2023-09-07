import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, SetStateAction, useState } from "react";
import { items } from "../../public/Items.json";


export default function Carousel() {
  const { bootstrap } = items;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: SetStateAction<number>, e: any) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
        carousel
    </div>
  );
}