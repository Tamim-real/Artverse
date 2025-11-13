import React from "react";

const experts = [
  {
    id: 1,
    name: "James Evergreen",
    specialization: "Calligrapher",
    image:
      "https://plus.unsplash.com/premium_photo-1682144187125-b55e638cf286?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000",
  },
  {
    id: 2,
    name: "Daniel Fern",
    specialization: "Illustrator",
    image:
      "https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000",
  },
  {
    id: 3,
    name: "Michael Bloom",
    specialization: "Sculptor",
    image:
      "https://plus.unsplash.com/premium_photo-1682096252599-e8536cd97d2b?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c21pbGluZyUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
  },
  {
    id: 4,
    name: "Ethan Moss",
    specialization: "Digital Artist",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000",
  },
];

const TopArtists = () => {
  return (
    <section className="py-12 px-6 md:px-12 text-center">
      <h2 className="text-3xl font-bold mb-8">
        Top Artists of the Week
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all"
          >
            <img
              src={expert.image}
              alt={expert.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {expert.name}
              </h3>
              <p className="text-green-600 text-sm font-medium">
                {expert.specialization}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopArtists;
