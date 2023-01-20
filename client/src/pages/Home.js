import Jumbotron from "../components/cards/jumbotron";
import { useAuth } from "../context/auth";

function Home() {
  return (
    <div>
      <Jumbotron title = "Hello World" subTitle="Welcome to React E-commerce"></Jumbotron>
    </div>
  );
}

export default Home;
