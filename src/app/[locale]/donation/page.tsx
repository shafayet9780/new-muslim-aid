import { useLocale } from "next-intl";
import BankDetails from "@/components/home/BankDetails";

export default function DonationPage() {
    const locale = useLocale();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-6 md:py-12">
            {/* Hero Section */}
            <BankDetails />

            {/* Important Note */}
            <div className="max-w-3xl mx-auto">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">
                        {locale === "bn" ? "গুরুত্বপূর্ণ নোট" : "Important Note"}
                    </h3>
                    <p className="text-lg opacity-90 leading-relaxed">
                        {locale === "bn"
                            ? "দান করার পর আপনার লেনদেনের স্ক্রিনশট আমাদের কাছে পাঠান। আমরা আপনার দানের রসিদ এবং আপডেট প্রদান করব।"
                            : "After donating, please send us a screenshot of your transaction. We will provide you with a receipt and updates."}
                    </p>
                    <div className="mt-6">
                        <a
                            href="tel:01861886162"
                            className="inline-block bg-white text-green-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-200"
                        >
                            {locale === "bn" ? "যোগাযোগ করুন: 01861886162" : "Contact: 01861886162"}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
