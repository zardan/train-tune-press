import SoundButton from "@/components/SoundButton";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Index = () => {
  const [username, setUsername] = useState(null);
  const [userLocked, setUserLocked] =useState(false);
  function handleSubmit(e) {
    setUserLocked(true);
    e.preventDefault();
  }

  return (
    <div className="min-h-screen flex flex-col items-center relative">
      <img 
        src="/lovable-uploads/cf8d8a25-28a7-4313-9f65-8e5102b03468.png" 
        alt="Train tracks at sunset" 
        className="background-image"
      />
      <SoundButton username={username}/>
      <div className="text-center z-10">
        <h1 className="text-4xl font-bold my-8 text-white drop-shadow-lg">
          Welcome to the On Track finale!
        </h1>
        <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput"></label>
        <Input id="usernameInput" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Team name" className="bg-black text-white" disabled={userLocked} />
      </div>
      {!userLocked && <button type="submit">Submit</button>}
    </form>
      </div>
    </div>
  );
};

export default Index;