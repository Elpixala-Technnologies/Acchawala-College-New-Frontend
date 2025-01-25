import React, { useState } from "react";

const ImageGalleryPopup = ({ images, onClose }: {
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
                        className="max-h-[500px] object-contain rounded-lg"
                    />
                    <button
                        onClick={handleNext}
                        className="absolute right-2 text-white text-3xl hover:text-gray-400"
                    >
                        &#8594;
                    </button>
                </div>

                {/* Thumbnail Scroll */}
                <div className="mt-4 flex overflow-x-auto space-x-2">
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

export default ImageGalleryPopup;