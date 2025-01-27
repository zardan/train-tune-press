import SoundButton from "@/components/SoundButton";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Index = () => {
  const [username, setUsername] = useState(null);
  const [userLocked, setUserLocked] = useState(false);
  const { toast } = useToast();


  function handleSubmit(e) {
    setUserLocked(true);
    e.preventDefault();

    //generate randon * string
    const length = Math.floor(Math.random() * 6) + 5; // Random number between 5 and 10
    const stars = "*".repeat(length);
    toast({
      className: (
        'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
      ),
      title: `${username} made a guess!!!!`
    })

  }

  return (
    <div className="min-h-screen flex flex-col items-center relative">
      <img
        src="/lovable-uploads/cf8d8a25-28a7-4313-9f65-8e5102b03468.png"
        alt="Train tracks at sunset"
        className="background-image"
      />
      <SoundButton username={username} />
      <div className="text-center z-10">
        <h1 className="text-4xl font-bold my-20 pt-20 text-white drop-shadow-lg">
          {userLocked ? "Where are we going?" : "Welcome to the On Track finale!"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-20 flex items-center justify-center">
            <label htmlFor="usernameInput"></label>
            <Input id="usernameInput" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Team name" className="bg-black text-white border-0 focus-visible:ring-0 w-full" disabled={userLocked} />
            {!userLocked &&
              <Button type="submit" className="bg-red-500 hover:bg-red-600 rounded-full" disabled={!username}>Submit</Button>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;