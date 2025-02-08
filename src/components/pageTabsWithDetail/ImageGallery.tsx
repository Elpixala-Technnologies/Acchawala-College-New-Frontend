import React, { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ groupedImages, selectedContent }: { groupedImages: any, selectedContent: any }) {

    const [galleryCategory, setGalleryCategory] = useState(selectedContent[0]?.category);

    const [galleryPopup, setGalleryPopup] = useState(false);

    return (
        <div className=" ">
            {galleryPopup && <ImageGalleryPopup images={groupedImages[galleryCategory]} onClose={() => setGalleryPopup(false)} />}
            <div className="flex justify-start items-center gap-5">
                {Object.keys(groupedImages).map((category, index) => {
                    // if (index === 0) setGalleryCategory(category)
                    return (
                        <h3
                            key={index}
                            onClick={() => setGalleryCategory(category)}
                            className={`my-3 text-lg capitalize px-7 py-[7px] rounded-3xl hover:cursor-pointer hover:bg-orange-500  ${galleryCategory === category ? "bg-orange-500" : "bg-[#FF820E66]"}`}
                        >
                            {category}</h3>
                    )
                })}
            </div>

            <div className="flex w-full items-center justify-center h-[251px] ">
                {Object.keys(groupedImages).map((category, index) => {
                    console.log(groupedImages[galleryCategory])
                    if (category === galleryCategory) {
                        const len = groupedImages[category].length;
                        return (
                            <div className={`w-full mt-8 h-full grid grid-cols-4 grid-rows-2 justify-around gap-5 }`}>
                                {groupedImages[category].slice(0, 5).map(
                                    (image: any, i: number) => {
                                        if (i === 0) {
                                            return (
                                                <div
                                                    onClick={() => setGalleryPopup(true)}
                                                    className="min-h-full min-w-[442px] bg-cover col-span-2 row-span-2 cursor-pointer"
                                                >
                                                    <Image
                                                        key={i}
                                                        src={image?.url}
                                                        width={442}
                                                        height={300}
                                                        alt={`${category} image`}
                                                        className="h-full w-full flex-wrap rounded-lg object-cover"
                                                    />
                                                </div>
                                            )
                                        }
                                        if (i == len - 1 || i == 4) {
                                            return (
                                                <div
                                                    onClick={() => setGalleryPopup(true)}
                                                    className="bg-cover relative rounded-lg overflow-hidden"
                                                >
                                                    <div
                                                        className="w-full h-full absolute bg-[#0000008C] top-0 left-0 flex justify-center items-center text-white hover:underline cursor-pointer"
                                                        onClick={() => {

                                                        }}
                                                    >
                                                        See more
                                                    </div>
                                                    <Image
                                                        key={i}
                                                        src={image?.url}
                                                        width={100}
                                                        height={100}
                                                        alt={`${category} image`}
                                                        className="h-full w-full flex-wrap  object-cover"
                                                    />
                                                </div>
                                            )
                                        }
                                        return (
                                            <div
                                                onClick={() => setGalleryPopup(true)}
                                                className="cursor-pointer"
                                            >
                                                <Image
                                                    key={i}
                                                    src={image?.url}
                                                    width={100}
                                                    height={100}
                                                    alt={`${category} image`}
                                                    className="h-full w-full flex-wrap rounded-lg object-cover"
                                                />
                                            </div>
                                        )
                                    },
                                )}
                            </div>)
                    }
                    return
                }

                )}
            </div>

        </div>
    )
}





export const ImageGalleryPopup = ({ images, onClose }: {
    images: { url: string }[];
    onClose: () => void;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative w-11/12 max-w-4xl">
                {/* Close Button */}
                <button
                    className="absolute top-2 right-2 text-white text-2xl hover:text-gray-400"
                    onClick={onClose}
                >
                    &times;
                </button>

                {/* Main Image */}
                <div className="flex items-center justify-center">
                    <button
                        onClick={handlePrev}
                        className="absolute left-2 text-white text-3xl hover:text-gray-400"
                    >
                        &#8592;
                    </button>
                    <img
                        src={images[currentIndex]?.url}
                        alt={`Image ${currentIndex + 1}`}
                        className="max-h-[500px] min-h-[500px] object-contain rounded-lg"
                    />
                    <button
                        onClick={handleNext}
                        className="absolute right-2 text-white text-3xl hover:text-gray-400"
                    >
                        &#8594;
                    </button>
                </div>

                {/* Thumbnail Scroll */}
                <div className="mt-4 flex overflow-x-auto space-x-2 items-center justify-center">
                    {images?.map((image: any, index: number) => (
                        <img
                            key={index}
                            src={image.url}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-20 w-32 object-cover cursor-pointer rounded-md ${currentIndex === index
                                ? "border-4 border-blue-500"
                                : "border-2 border-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
