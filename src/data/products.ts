export type Product = {
    id: string;
    name: string;
    category: string;
    description: string;
    price: string;
    image: string;
    note: string;
};

export const products: Product[] = [
    {
        id: "01",
        name: "Velvet Cloud",
        category: "Signature iced",
        description: "Double espresso, silky milk and a soft vanilla finish.",
        price: "LKR 1,250",
        image: "/images/signature/signature.png",
        note: "Soft · Creamy · Balanced",
    },
    {
        id: "02",
        name: "Golden Hour",
        category: "Signature iced",
        description:
            "A slow pour of espresso with caramel and a hint of sea salt.",
        price: "LKR 1,350",
        image: "/images/signature/signature2.png",
        note: "Rich · Sweet · Smooth",
    },
    {
        id: "03",
        name: "Cocoa No. 5",
        category: "Chocolate",
        description: "Deep cocoa, espresso and a delicate cloud of cold foam.",
        price: "LKR 1,400",
        image: "/images/signature/signature3.png",
        note: "Bold · Decadent · Silky",
    },
];
