import React from 'react';

const FAQs = () => {
  return (
    <div className="w-[90%] mx-auto mt-16 mb-16 space-y-4">
      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">
          How do I book a tour package?
        </div>
        <div className="collapse-content text-sm text-foreground">
          You can book a tour by logging into your account, selecting a package, and clicking the “Book Now” button. Fill out the form and proceed with payment to confirm your booking.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">
          Can I cancel or reschedule a booking?
        </div>
        <div className="collapse-content text-sm text-foreground">
          Cancellation and rescheduling policies vary by package. Please check the terms listed under each tour or contact customer support for assistance.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">
          What payment methods are supported?
        </div>
        <div className="collapse-content text-sm text-foreground">
          We support Bkash, Nagad, Rocket, VISA, Mastercard, and other major Bangladeshi mobile banking options.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">
          Will I get a confirmation after booking?
        </div>
        <div className="collapse-content text-sm text-foreground">
          Yes. Once your payment is confirmed, you’ll receive a confirmation email along with your booking ID and package details.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">
          Are guides included in the tour package?
        </div>
        <div className="collapse-content text-sm text-foreground">
          Yes, most of our packages include professional tour guides. Details are listed in each package description.
        </div>
      </div>
    </div>
  );
};

export default FAQs;
