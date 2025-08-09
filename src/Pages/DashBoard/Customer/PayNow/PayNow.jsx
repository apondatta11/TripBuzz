import { useNavigate } from 'react-router';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { Button } from '@/components/ui/button';
import UseAuth from '@/Hooks/UseAuth';
import Loading from '@/Components/Loading/Loading';

const PayNow = ({ bookings = [], refetch }) => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const unpaidBookings = bookings.filter(booking => 
        booking.payment_status !== 'paid' && 
        booking.tour_status === 'upcoming'
    );

    const goToPayment = async (bookingId, packageId, price) => {
        const payment = {
            name: user.displayName,
            email: user.email,
            price: price,
            transactionId: "",
            date: new Date().toISOString().split('T')[0],
            tourId: packageId,
            bookingId: bookingId,
            status: "pending",
        };
        
        const response = await axiosSecure.post("/create-ssl-payment", payment);
        if (response.data?.gatewayUrl) {
            window.location.replace(response.data.gatewayUrl);
        }
    };

    if (unpaidBookings.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">No pending payments</p>
            </div>
        );
    }
    if (isLoading) return <Loading />;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">Pending Payments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unpaidBookings.map(booking => (
                    <div key={booking._id} className="bg-card border border-border rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold">{booking.tourName}</h3>
                            <span className="badge badge-warning text-warning-foreground">Payment Due</span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-1">
                            Departure: {new Date(booking.departureDate || booking.bookingDate).toLocaleDateString()}
                        </p>
                        <p className="font-bold text-lg text-primary mb-3">
                            ৳{parseInt(booking.price).toLocaleString()}
                        </p>
                        <div className="flex justify-between items-center">
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(`/packages/${booking.packageId}`)}
                            >
                                View Details
                            </Button>
                            <Button 
                                size="sm"
                                onClick={() => goToPayment(booking._id, booking.packageId, booking.price)}
                            >
                                Pay Now
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PayNow;