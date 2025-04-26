import WelcomeImg from "./WelcomeImg";
import WelcomeTitle from "./WelcomeTitle";

interface WelcomeProps {
  onCategorySelect: (category: string) => void;
}

const Welcome = ({ onCategorySelect }: WelcomeProps) => {
  return (
    <div className="welcome">
      <WelcomeTitle onCategorySelect={onCategorySelect} />
      <WelcomeImg />
    </div>
  );
};

export default Welcome;
