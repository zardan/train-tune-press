import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { emitWhistle, onWhistle, cleanup } from '@/services/socketService';

const SoundButton = () => {
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
    emitWhistle(); // Emit event to other users
  };

  return (
    <Button 
      onClick={handleClick}
      className="whistle-button bg-[#1a2b3c] hover:bg-[#2a3b4c] text-white px-8 py-6 rounded-full shadow-lg"
    >
      🚂 Blow Train Whistle
    </Button>
  );
};

export default SoundButton;