import { PricingTable } from '@clerk/react';
import Title from './Title';



export default function Pricing() {
    
    return (
        <section id="pricing" className="py-20 border-t border-emerald-400/10 bg-emerald-950/20">
            <div className="max-w-6xl mx-auto px-4">

                <Title
                    title="Pricing"
                    heading="Pricing plans for every stage"
                    description="Flexible AI plans designed for creators, startups, growing businesses, and marketing teams."
                />

                <div className="flex flex-wrap items-center justify-center max-w-5xl mx-auto">
                    <PricingTable appearance={{
                        variables: {
                            colorBackground: 'none'
                        },
                        elements: {
                            pricingTableCardBody: 'bg-white/6',
                            pricingTableCardHeader: 'bg-white/10',
                            switchThumb: 'bg-white'
                        }
                    }}/>
                </div>
            </div>
        </section>
    );
};