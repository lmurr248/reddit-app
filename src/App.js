import "./App.css";
import Header from "./components/Header/Header";
import Feed from "./components/Feed/Feed";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <div className="feed">
          <Feed />
        </div>
        <div className="sidebar">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
