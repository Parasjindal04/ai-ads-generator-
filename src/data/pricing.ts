import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Starter",
        price: 19,
        period: "month",
        features: [
            "100 ad generations per month",
            "Basic templates",
            "Email support",
            "Standard export formats",
            "Basic analytics"
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 49,
        period: "month",
        features: [
            "Unlimited ad generations",
            "Premium templates",
            "Priority support",
            "Advanced export options",
            "Detailed analytics",
            "A/B testing tools",
            "Custom branding"
        ],
        mostPopular: true
    },
    {
        name: "Enterprise",
        price: 99,
        period: "month",
        features: [
            "Everything in Pro",
            "White-label solution",
            "Dedicated account manager",
            "API access",
            "Custom integrations",
            "Advanced AI models"
        ],
        mostPopular: false
    }
];