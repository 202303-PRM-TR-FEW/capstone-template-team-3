import Image from "next/image";

const Card = ({ img, title, raised, goal }) => {
  return (
    <div className="w-80 h-96 max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
      <a href="#">
        <Image
          className="p-8 rounded-t-lg"
          src={img}
          alt={title}
          width={800}
          height={200}
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">
            {title}
          </h1>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-[#d4ee26] h-2.5 rounded-full w-3/5"></div>
          </div>
        </div>
        <div className="flex sm:items-center justify-between sm:flex-row gap-4 flex-col items-left">
          <div>
            <p>Raised:</p>
            <p>${raised}</p>
          </div>
          <div>
            <p>Goal:</p>
            <p>${goal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
