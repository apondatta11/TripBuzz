const WhyChooseUs = () => (
    <section className="py-16 px-4 bg-primary text-neutral-content">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose TripBuzz?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        icon: '🏆',
                        title: 'Expert Guides',
                        desc: 'Our certified guides have 5+ years of experience'
                    },
                    {
                        icon: '💰',
                        title: 'Best Price Guarantee',
                        desc: 'We offer the best prices for premium experiences'
                    },
                    {
                        icon: '🛡️',
                        title: 'Safe Travel',
                        desc: 'Your safety is our top priority'
                    }
                ].map((item, index) => (
                    <div key={index} className="text-center p-6 bg-primary/80 rounded-lg">
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p>{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
export default WhyChooseUs;