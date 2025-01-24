import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SoundButton = () => {
  const [audio] = useState(new Audio('/train-whistle.mp3'));
  const { toast } = useToast();

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

  return (
    <Button 
      onClick={playSound}
      className="whistle-button bg-[#1a2b3c] hover:bg-[#2a3b4c] text-white px-8 py-6 rounded-full shadow-lg"
    >
      🚂 Blow Train Whistle
    </Button>
  );
};

export default SoundButton;