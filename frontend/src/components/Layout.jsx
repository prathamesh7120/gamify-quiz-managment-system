import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-[#0B0F19] text-white overflow-x-hidden">

      {/* HEADER */}
      <Header 
        title="Quiz App"
        subtitle="Play and compete with others"
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}