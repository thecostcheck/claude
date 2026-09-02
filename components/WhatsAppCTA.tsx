'use client'

const WhatsAppCTA = () => {
  const whatsappUrl = 'https://wa.me/13366066975?text=Hi%20The%20Cost%20Check%20team%21%20I%27d%20like%20to%20schedule%20a%20free%20cost%20review.'

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all z-40 text-2xl"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      💬
    </a>
  )
}

export default WhatsAppCTA
