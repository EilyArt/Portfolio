import { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import photo1 from "@/images/blog-dark.jpeg";
import photo2 from "@/images/sample.jpeg";
import photo3 from "@/images/sample2.jpeg";
import photo4 from "@/images/avatar.png";
import photo5 from "@/images/img1.png";
import photo6 from "@/images/sample3.jpeg";
import Image from "next/dist/client/image";

const Gallery = ({ id }: any) => {

    const [gallery, setGallery] = useState([photo1, photo2, photo3, photo4, photo5, photo6]);

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
                {gallery.map((ele: any, index: any) => {
                    return (
                        <div className={`gallery-images-image gallery-images-image${id}`} >
                            <Image objectFit="cover" layout="fill" src={gallery[index]} />
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
