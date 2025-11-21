import React from "react";

const images = [
  "/gallery/img1.jpeg",
  "/gallery/img2.webp",
  "/gallery/progress1.jpg",
  "/gallery/design_mockup.jpg",
];

const Gallery = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow border ">
      <h2 className="text-xl font-semibold mb-4">Site Images</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((src, i) => (
          <div key={i}>
            <img
              src={src}
              alt="Project Image"
              className="w-full h-32 object-cover rounded-lg shadow-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
