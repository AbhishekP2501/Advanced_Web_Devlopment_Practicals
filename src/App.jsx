import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import Projects from "./components/project";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Header />
        <About />
        <Skills />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

export default App;