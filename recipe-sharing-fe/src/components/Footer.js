const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} Recipe Sharing. All rights reserved.</p>
                <p>Follow us on social media!</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="#" className="hover:underline">Facebook</a>
                    <a href="#" className="hover:underline">Instagram</a>
                    <a href="#" className="hover:underline">Twitter</a>
                </div>
            </div>
        </footer>
    );
};
export default Footer;

