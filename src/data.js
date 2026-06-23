const Categories = [
    {
        "id": 1,
        "category": "Nuts",
        "items": [
            "Almonds",
            "Walnuts",
            "Cashews",
            "Pistachios"
        ],
        "description": "Popular crunchy nuts often used in snacks and desserts."
    },
    {
        "id": 2,
        "category": "Seeds",
        "items": [
            "Pumpkin Seeds",
            "Sunflower Seeds",
            "Flax Seeds",
            "Chia Seeds"
        ],
        "description": "Nutritious seeds used for snacking, baking, and topping dishes."
    },
    {
        "id": 3,
        "category": "Dried Fruits",
        "items": [
            "Raisins",
            "Apricots",
            "Figs",
            "Dates"
        ],
        "description": "Sweet dried fruits commonly used in cooking and confectionery."
    },
    {
        "id": 4,
        "category": "Candied",
        "items": [
            "Candied Ginger",
            "Candied Orange Peel",
            "Glazed Nuts",
            "Sweetened Coconut"
        ],
        "description": "Dry fruit products preserved and sweetened for snacking."
    }
]

const Products = [
    {
        id: 1,
        name: 'Almonds',
        category: 'Nuts',
        variants: [
            { id: 101, weight: '250gms', price: 350, originalPrice: 450 },
            { id: 102, weight: '500gms', price: 650, originalPrice: 850 }
        ]
    },
    {
        id: 2,
        name: 'Cashews',
        category: 'Nuts',
        variants: [
            { id: 201, weight: '250gms', price: 420, originalPrice: 550 },
            { id: 202, weight: '500gms', price: 780, originalPrice: 1000 }
        ]
    },
    {
        id: 3,
        name: 'Walnuts',
        category: 'Nuts',
        variants: [
            { id: 301, weight: '250gms', price: 450, originalPrice: 580 },
            { id: 302, weight: '500gms', price: 820, originalPrice: 1050 }
        ]
    },
    {
        id: 4,
        name: 'Pistachios',
        category: 'Nuts',
        variants: [
            { id: 401, weight: '250gms', price: 390, originalPrice: 500 },
            { id: 402, weight: '500gms', price: 740, originalPrice: 950 }
        ]
    },
    {
        id: 5,
        name: 'Raisins',
        category: 'Dried Fruits',
        variants: [
            { id: 501, weight: '250gms', price: 180, originalPrice: 240 },
            { id: 502, weight: '500gms', price: 340, originalPrice: 450 }
        ]
    },
    {
        id: 6,
        name: 'Apricots',
        category: 'Dried Fruits',
        variants: [
            { id: 601, weight: '250gms', price: 240, originalPrice: 320 },
            { id: 602, weight: '500gms', price: 460, originalPrice: 600 }
        ]
    },
    {
        id: 7,
        name: 'Pumpkin Seeds',
        category: 'Seeds',
        variants: [
            { id: 701, weight: '250gms', price: 220, originalPrice: 290 },
            { id: 702, weight: '500gms', price: 420, originalPrice: 550 }
        ]
    },
    {
        id: 8,
        name: 'Sunflower Seeds',
        category: 'Seeds',
        variants: [
            { id: 801, weight: '250gms', price: 200, originalPrice: 270 },
            { id: 802, weight: '500gms', price: 380, originalPrice: 500 }
        ]
    }
]

const Blogs = [
    {
        id: 1,
        title: '5 Health Benefits of Eating Almonds Daily',
        category: 'Nuts',
        excerpt: 'Learn why almonds are a great daily snack for energy, heart health, and glowing skin.',
        author: 'Asha Patel',
        date: '2026-05-29',
        readTime: '4 min',
        tags: ['Almonds', 'Health', 'Nutrition'],
        slug: 'health-benefits-almonds'
    },
    {
        id: 2,
        title: 'How to Choose the Best Dry Fruits for Summer',
        category: 'Dried Fruits',
        excerpt: 'A quick guide to selecting the right dried fruits for hydration and immunity during warm months.',
        author: 'Suresh Rao',
        date: '2026-05-27',
        readTime: '5 min',
        tags: ['Dried Fruits', 'Summer', 'Wellness'],
        slug: 'choose-best-dry-fruits-summer'
    },
    {
        id: 3,
        title: 'Why Pumpkin Seeds Are a Superfood for Vegans',
        category: 'Seeds',
        excerpt: 'Explore the protein, zinc, and omega-3 benefits of pumpkin seeds for plant-based diets.',
        author: 'Priya Singh',
        date: '2026-05-25',
        readTime: '4 min',
        tags: ['Seeds', 'Vegan', 'Superfood'],
        slug: 'pumpkin-seeds-superfood'
    },
    {
        id: 4,
        title: 'Top 3 Ways to Use Candied Ginger in Desserts',
        category: 'Candied',
        excerpt: 'Sweet and spicy ideas for adding candied ginger to cakes, cookies, and festive treats.',
        author: 'Nikhil Sharma',
        date: '2026-05-23',
        readTime: '3 min',
        tags: ['Candied', 'Recipes', 'Desserts'],
        slug: 'candied-ginger-desserts'
    }
]



export default Categories
export { Products, Blogs }

