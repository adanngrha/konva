import useImage from "use-image";
import { Image } from "react-konva";

export default function CatImage(handleContextMenu) {
  const [image] = useImage('https://th.bing.com/th/id/R.2980fb4ae416c660e3cb0b5c69e02be2?rik=OPv5OiZT1ZhS2w&riu=http%3a%2f%2fimages2.fanpop.com%2fimage%2fphotos%2f9400000%2fFunny-Cats-cats-9473424-1600-1200.jpg&ehk=C1Tp0AIZL9O%2bAN5sXLb9qCd69qC3EH9PuFDZwVPbH4M%3d&risl=&pid=ImgRaw&r=0')
  return <Image 
    x={20}
    y={50}
    image={image} 
    width={160}
    height={120}
    draggable
    onContextMenu={(e) => handleContextMenu(e, 'cat')}
  />;
}