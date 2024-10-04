import { Button } from "@/components/ui/button";
import authenticationCheck from "@/utils/authenticationCheck";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() => {
          authenticationCheck(navigate, location);
        }}
      >
        TEST
      </Button>
    </div>
  );
};

export default Dashboard;
