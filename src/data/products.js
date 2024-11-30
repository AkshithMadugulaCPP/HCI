export const products = [
    {
        id: "1",
        title: "RECCO® TECHNOLOGY WATER AND WIND PROTECTION DOWN JACKET SKI",
        price: 259.00,
        image: "assets/recco-jacket.jpg",
        inventory: {
            status: "LOW_STOCK",
            available: true
        },
        variants: {
            sizes: [
                { code: "S", available: true },
                { code: "M", available: true },
                { code: "L", available: false }
            ],
            colors: [
                { name: "PRINTED", available: true },
                { name: "BLACK", available: false },
                { name: "WHITE", available: true }
            ]
        }
    },
    {
        id: "2",
        title: "WASHED TEXTURED SWEATER",
        price: 59.90,
        image: "assets/washed-sweater.jpg",
        inventory: {
            status: "IN_STOCK",
            available: true
        },
        variants: {
            sizes: [
                { code: "S", available: true },
                { code: "M", available: false },
                { code: "L", available: true }
            ],
            colors: [
                { name: "BROWN", available: true },
                { name: "BLACK", available: true },
                { name: "GREY", available: false }
            ]
        }
    }
];