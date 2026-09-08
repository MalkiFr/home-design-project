import "./App.css";
import PinterestGallery from "./components/PinterestGallery";

function App() {
  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">HOME DESIGN AI</p>

        <h1>Find Your Design Inspiration</h1>

        <p className="hero-description">
         Choose a space you love<br></br>
         
          Select an image to explore its colors and design direction.
        </p>
      </header>

      <PinterestGallery />
    </main>
  );
}

export default App;