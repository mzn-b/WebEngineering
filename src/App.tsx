import { Header } from "./components/Header.tsx";
import { Footer } from "./components/Footer.tsx";
import { Navbar } from "./components/Navbar.tsx";
import { ArticleContainer } from "./components/ArticleContainer.tsx";
import { Sidebar } from "./components/Sidebar.tsx";
import { SearchProvider } from "./context/SearchContextProvider.tsx";

function App() {
  return (
    <SearchProvider>
      <Header />
      <Navbar />
      <main>
        <ArticleContainer />
        <Sidebar />
      </main>
      <Footer />
    </SearchProvider>
  );
}

export default App;
