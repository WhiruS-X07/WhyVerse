const TrailerModal = ({ trailer, onClose }) => {
  if (!trailer) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close trailer"
          className="absolute -top-12 right-0 text-3xl font-bold text-white hover:text-orange-500"
        >
          ×
        </button>
        <div className="aspect-video overflow-hidden rounded-2xl">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
            title={trailer.name}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
