"use client";
import React, { useState, useMemo } from "react";

const Carousel3D = () => {
    const cards = [
        {
            id: 1,
            title: "Certificate of Completion",
            category: "Educational",
            img: "https://marketplace.canva.com/EAGTnx__MrY/1/0/1131w/canva-black-gold-modern-workshop-completion-certificate-TLZbgjF3mN0.jpg",
        },
        {
            id: 2,
            title: "Skill Achievement Badge",
            category: "Skills",
            img: "https://marketplace.canva.com/EAGTnx__MrY/1/0/1131w/canva-black-gold-modern-workshop-completion-certificate-TLZbgjF3mN0.jpg",
        },
        {
            id: 3,
            title: "Workshop Participation",
            category: "Educational",
            img: "https://marketplace.canva.com/EAGTnx__MrY/1/0/1131w/canva-black-gold-modern-workshop-completion-certificate-TLZbgjF3mN0.jpg",
        },
        {
            id: 4,
            title: "Professional Skill Training",
            category: "Skills",
            img: "https://marketplace.canva.com/EAGTnx__MrY/1/0/1131w/canva-black-gold-modern-workshop-completion-certificate-TLZbgjF3mN0.jpg",
        },
        {
            id: 5,
            title: "Certification of Excellence",
            category: "Educational",
            img: "https://marketplace.canva.com/EAGTnx__MrY/1/0/1131w/canva-black-gold-modern-workshop-completion-certificate-TLZbgjF3mN0.jpg",
        },
    ];

    const categories = ["All", "Educational", "Skills"];
    const [activeCategory, setActiveCategory] = useState("All");

    const categoryCounts = useMemo(() => {
        const counts = { All: cards.length };
        categories.forEach((cat) => {
            if (cat !== "All") {
                counts[cat] = cards.filter((c) => c.category === cat).length;
            }
        });
        return counts;
    }, [cards]);

    const filteredCards =
        activeCategory === "All"
            ? cards
            : cards.filter((c) => c.category === activeCategory);

    const [activeIndex, setActiveIndex] = useState(2);

    const normalizedIndex =
        filteredCards.length > 0
            ? ((activeIndex % filteredCards.length) + filteredCards.length) % filteredCards.length
            : 0;

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % filteredCards.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) =>
            prev === 0 ? filteredCards.length - 1 : prev - 1
        );
    };

    return (
        <div className="relative flex flex-col items-center justify-center w-full max-h-full overflow-hidden">
            <div className="flex flex-wrap items-center justify-center gap-6 mb-10 mt-10">
                {categories.map((cat) => {
                    const isDisabled = cat !== "All" && categoryCounts[cat] === 0;
                    return (
                        <span
                            key={cat}
                            onClick={() => !isDisabled && setActiveCategory(cat)}
                            className={`transition text-[1rem] md:text-[1.2rem] font-semibold uppercase 
                                ${isDisabled
                                    ? "text-gray-500 cursor-not-allowed opacity-40"
                                    : activeCategory === cat
                                        ? "cursor-pointer text-glow-stroke-neon"
                                        : "cursor-pointer text-amethyst-neon/70 hover:text-amethyst-neon"
                                }`}
                        >
                            {cat}
                        </span>
                    );
                })}
            </div>

            <div className="relative w-full flex items-center justify-center perspective-3d h-[74vh]">
                {filteredCards.length > 0 ? (
                    filteredCards.map((card, index) => {
                        let offset = index - normalizedIndex;
                        if (offset < -Math.floor(filteredCards.length / 2)) {
                            offset += filteredCards.length;
                        } else if (offset > Math.floor(filteredCards.length / 2)) {
                            offset -= filteredCards.length;
                        }

                        const absOffset = Math.abs(offset);

                        // 3D position & transformation
                        const translateX = offset * 200;      // horizontal distance between cards
                        const translateZ = -absOffset * 80;   // depth for 3D perspective
                        const rotateY = offset * -25;         // horizontal rotation
                        const scale = offset === 0 ? 1 : 0.8; // center card larger

                        return (
                            <div
                                key={card.id}
                                className="absolute w-auto h-full py-6 text-white rounded-2xl flex flex-col items-center justify-between text-xl font-bold transition-all duration-700 ease-in-out"
                                style={{
                                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                                    zIndex: 100 - absOffset,
                                    opacity: 1 - absOffset * 0.25,
                                    filter: `brightness(${1 - absOffset * 0.25})`,
                                }}
                            >
                                {/* Cert Image */}
                                <div className="relative w-full h-full p-[0.3rem] flex items-center justify-center rounded-lg 
                                                    border border-[#ffb627] bg-yellow-400/5 backdrop-blur-md
                                                    shadow-[inset_0_4px_15px_rgba(255,182,39,0.35)]
                                                    before:content-[''] before:absolute before:inset-0 before:rounded-lg before:border before:border-[#ffc27b]
                                                    before:shadow-[0_0_0px_orangered,0_0_3px_orangered,0_0_10px_#ffb627]
                                                    before:pointer-events-none transition-shadow duration-500"
                                >
                                    <img
                                        src={card.img}
                                        alt={card.title}
                                        className="w-full h-full object-cover rounded-lg"
                                        style={{
                                            filter:
                                                "sepia(70%) saturate(310%) hue-rotate(3deg) brightness(78%)",
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/10 via-transparent to-yellow-500/5 rounded-lg mix-blend-overlay pointer-events-none"></div>
                                </div>

                                {/* Cert Name */}
                                <div className="relative w-full text-center rounded-lg border border-[#ffb627] bg-transparent backdrop-blur-md 
                                                    before:absolute before:inset-0 before:rounded-lg before:border before:border-[#ffc27b]
                                                    before:shadow-[0_0_5px_#ffb627,0_0_3px_orangered,0_0_5px_#ffb627]
                                                    before:pointer-events-none shadow-[inset_0_4px_15px_rgba(255,182,39,0.25)] p-3"
                                >
                                    <h3 className="text-center text-lg font-semibold text-[#FFB627] tracking-wide relative z-10 drop-shadow-[0_0_5px_#ffb627]">
                                        {card.title}
                                    </h3>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-[#FFB627] text-lg font-semibold drop-shadow-[0_0_5px_#ffb627]">
                        No items found in this category!
                    </div>
                )}
            </div>

            {/* Next / Previous Certs */}
            {filteredCards.length > 0 && (
                <div className="flex gap-6 mt-16">
                    <button
                        onClick={prevSlide}
                        className="px-4 py-2 border border-[#ffb627] bg-yellow-400/10 backdrop-blur-md text-white rounded-lg hover:shadow-[inset_0_4px_12px_rgba(251,191,36,0.25)]"
                    >
                        Prev
                    </button>
                    <button
                        onClick={nextSlide}
                        className="px-4 py-2 border border-[#ffb627] bg-yellow-400/10 backdrop-blur-md text-white rounded-lg hover:shadow-[inset_0_4px_12px_rgba(251,191,36,0.25)]"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Carousel3D;
