import "./App.css";
import Header from "./components/Header/Header";
import Feed from "./components/Feed/Feed";
import { useEffect } from "react";
import { fetchSubreddits } from "./store/redditSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <div>
        <Feed />
      </div>
    </div>
  );
}

export default App;
