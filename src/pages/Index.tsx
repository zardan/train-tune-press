import SoundButton from "@/components/SoundButton";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <img 
        src="/lovable-uploads/cf8d8a25-28a7-4313-9f65-8e5102b03468.png" 
        alt="Train tracks at sunset" 
        className="background-image"
      />
      <div className="text-center z-10">
        <h1 className="text-4xl font-bold mb-8 text-white drop-shadow-lg">
          Welcome to the Railway
        </h1>
        <SoundButton />
      </div>
    </div>
  );
};

export default Index;