import Image from 'next/image';

const YourComponent = () => {
  return (
    <div>
      <Image
        src="https://res.cloudinary.com/dntowouv0/image/upload/v1737919512/Amala_jlxqmn.jpg"
        alt="Amala"
        width={500}
        height={500}
        onLoad={() => console.log('Image loaded')}
      />
      {/* Update other Image components similarly */}
    </div>
  );
};

export default YourComponent;
