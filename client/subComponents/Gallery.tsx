import { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import Image from "next/dist/client/image";

const Gallery = ({ id, images }: any) => {
    const [gallery, setGallery] = useState(images);

    function moveLeft(event: any) {
        const newTodos = gallery.slice();
        let lastImage: any = newTodos.shift();
        newTodos.push(lastImage);
        setGallery(newTodos);
        const images = document.getElementsByClassName(`gallery-images-image${id}`);

        for (let i = 0; i < images.length; i++) {
            images[i].classList.add("animation");
        }
        setTimeout(() => {
            for (let i = 0; i < images.length; i++) {
                images[i].classList.remove("animation");
            }
        }, 300)
    }

    function moveRight(event: any) {
        const newTodos = gallery.slice();
        let lastImage: any = newTodos.pop();
        newTodos.unshift(lastImage);
        setGallery(newTodos);
        const images = document.getElementsByClassName(`gallery-images-image${id}`);

        for (let i = 0; i < images.length; i++) {
            images[i].classList.add("animation");
        }
        setTimeout(() => {
            for (let i = 0; i < images.length; i++) {
                images[i].classList.remove("animation");
            }
        }, 300)
    }

    return (
        <div className="gallery">
            <div className="gallery-arrowLeft" onClick={(event) => moveRight(event)}>
                <FaArrowAltCircleLeft />
            </div>
            <div className="gallery-images">
                {gallery.map((image: any, index: any) => {
                    return (
                        <div className={`gallery-images-image gallery-images-image${id}`} >
                            <Image
                                objectFit="cover"
                                layout="fill"
                                alt={`${image.alt}`}
                                loader={() => `${process.env.NEXT_PUBLIC_API}media/${image.image}`}
                                src={`${process.env.NEXT_PUBLIC_API}media/${image.image}`}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="gallery-arrowRight" onClick={(event) => moveLeft(event)}>
                <FaArrowAltCircleRight />
            </div>
        </div>
    )
}

export default Gallery
