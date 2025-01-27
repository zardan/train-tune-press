import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { emitWhistle, onWhistle, cleanup } from '@/services/socketService';

const SoundButton = ({username, onClick}:{username:string, onClick: () => void}) => {
  const [audio] = useState(new Audio('/Dressinen.mp3'));
  const [isPulled, setIsPulled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Listen for whistle events from other users
    onWhistle(() => {
      playSound();
    });

    // Cleanup on unmount
    return () => {
      cleanup();
    };
  }, []);

  const playSound = () => {
    audio.currentTime = 0;
    audio.play().catch((error) => {
      toast({
        title: "Couldn't play sound",
        description: "Please click again to enable sound playback.",
        variant: "destructive"
      });
    });
  };

  const handleClick = () => {

    onClick();

    setIsPulled(true);
    setTimeout(() => setIsPulled(false), 1000);

    playSound();
    emitWhistle(username); // Emit event to other users
  };

  return (
    <Button 
      onClick={handleClick}
      //className="whistle-button bg-[#ea384c] hover:bg-red-600 text-center text-white px-8 py-6 rounded-full shadow-lg"
      className={"whistle-button bg-transparent hover:bg-transparent mt-20 p-10 " + (isPulled ? 'translate-y-10' : '')}
    >
      <img
        src="/nodbroms.png" // Replace this with the correct path to your image
        alt="Nödbroms"
        style={{ width: 500}} // Adjust as necessary
      />
    </Button>
  );
};

export default SoundButton;