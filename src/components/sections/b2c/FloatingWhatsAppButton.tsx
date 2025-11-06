const FloatingWhatsAppButton = () => {
  return (
    <button
      onClick={() => window.open("https://wa.me/919340128637", "_blank")}
      className="fixed bottom-6 right-6 z-40 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg px-5 py-3"
      aria-label="Chat on WhatsApp"
    >
      WhatsApp
    </button>
  );
};

export default FloatingWhatsAppButton;
