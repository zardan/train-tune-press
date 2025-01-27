import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { emitWhistle, onWhistle, cleanup } from '@/services/socketService';

const SoundButton = ({username}:{username:string}) => {
  const [audio] = useState(new Audio('/train-whistle.mp3'));
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
    playSound();
    emitWhistle(username); // Emit event to other users
  };

  return (
    <Button 
      onClick={handleClick}
      className="whistle-button bg-[#ea384c] hover:bg-red-600 text-white px-8 py-6 rounded-full shadow-lg"
    >
      NÖDBROMS
    </Button>
  );
};

export default SoundButton;