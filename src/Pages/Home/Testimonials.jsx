const Testimonials = () => (
    <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">What Our Travelers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                {
                    name: "Rahim Khan",
                    trip: "Sundarban Adventure",
                    review: "The tour exceeded all expectations! Our guide was incredibly knowledgeable.",
                    rating: 5
                },
                {
                    name: "Fatima Ahmed",
                    trip: "Cox's Bazar Retreat",
                    review: "Perfect balance of relaxation and activities. Will book again!",
                    rating: 4
                },
                {
                    name: "Jamal Hossain",
                    trip: "Bandarban Trekking",
                    review: "Unforgettable experience with excellent organization.",
                    rating: 5
                }
            ].map((testimonial, index) => (
                <div key={index} className="card bg-neutral p-6 shadow-md">
                    <div className="flex items-center mb-4">
                        <div className="avatar placeholder">
                            <div className="bg-secondary text-neutral-content rounded-full w-12">
                                <span>{testimonial.name.charAt(0)}</span>
                            </div>
                        </div>
                        <div className="ml-4">
                            <h4 className="font-bold text-text">{testimonial.name}</h4>
                            <p className="text-sm text-text/80">{testimonial.trip}</p>
                        </div>
                    </div>
                    <p className="mb-4 text-text">"{testimonial.review}"</p>
                    <div className="flex text-secondary">
                        {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < testimonial.rating ? '★' : '☆'}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </section>
);
export default Testimonials;