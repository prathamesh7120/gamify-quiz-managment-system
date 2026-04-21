import { motion } from "framer-motion";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Certificate = ({
  name = "FastThinker",
  country = "AU",
  rank = 4,
  score = 9650,
  correct = 89,
  streak = 8,
  date = "May 25, 2025",
}) => {
  const certRef = useRef();

  const getRankLabel = (rank) => {
    if (rank === 1) return "🥇 Champion";
    if (rank === 2) return "🥈 Runner Up";
    if (rank === 3) return "🥉 Second Runner";
    return "🏅 Top Performer";
  };

  // ✅ FINAL FIXED PDF FUNCTION
  const downloadPDF = async () => {
    const element = certRef.current;

    // 🔥 clone for safe rendering
    const clone = element.cloneNode(true);

    // ❗ REMOVE gradient text for PDF (important fix)
    const gradientTexts = clone.querySelectorAll(".gradient-text");
    gradientTexts.forEach((el) => {
      el.style.background = "none";
      el.style.color = "#22d3ee"; // cyan
      el.style.webkitTextFillColor = "#22d3ee";
    });

    clone.style.width = "842px";
    clone.style.height = "595px";
    clone.style.position = "fixed";
    clone.style.top = "-9999px";
    clone.style.left = "0";

    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 3,
      useCORS: true,
      width: 842,
      height: 595,
      windowWidth: 842,
      windowHeight: 595,
      backgroundColor: "#0b1020",
    });

    document.body.removeChild(clone);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "px", [842, 595]);
    pdf.addImage(imgData, "PNG", 0, 0, 842, 595);
    pdf.save(`${name}_certificate.pdf`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050816] p-4 gap-6">

      {/* MOBILE FIX */}
      <div className="w-full flex justify-center overflow-x-auto">
        <div className="origin-top scale-[0.55] sm:scale-100">

          <motion.div
            ref={certRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-[842px] h-[595px] rounded-xl overflow-hidden shadow-2xl"
          >

            {/* BACKGROUND */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b1020] via-[#11172a] to-[#0f1529]" />

            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] [background-size:25px_25px]" />

            {/* CONTENT */}
            <div className="relative z-10 h-full p-8 text-white flex flex-col justify-between">

              {/* 🏆 TITLE */}
              <div className="text-center">
                <h1 className="text-6xl font-extrabold gradient-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                  CERTIFICATE
                </h1>
                <p className="text-gray-400 text-lg tracking-[8px] mt-1">
                  OF ACHIEVEMENT
                </p>
              </div>

              {/* PROFILE */}
              <div className="flex justify-center mt-2">
                <motion.img
                  src="https://i.pravatar.cc/150?img=12"
                  className="w-24 h-24 rounded-full border-4 border-cyan-400"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />
              </div>

              {/* NAME ROW */}
              <div>
                <p className="text-gray-400 text-center">Presented to</p>

                <div className="flex items-center justify-between mt-4">

                  {/* RANK */}
                  <div className="bg-purple-600/20 px-6 py-3 rounded-lg border border-purple-400/20 text-center min-w-[140px]">
                    <p className="text-xs text-gray-400">RANK</p>
                    <h2 className="text-2xl font-bold text-purple-400">
                      #{rank}
                    </h2>
                    <p className="text-xs">{getRankLabel(rank)}</p>
                  </div>

                  {/* NAME */}
                  <div className="text-center flex-1">
                    <h2 className="text-5xl font-bold">
                      {name}{" "}
                      <span className="text-purple-400 text-2xl">
                        {country}
                      </span>
                    </h2>

                    <p className="mt-2 text-lg text-cyan-300">
                      Outstanding Performance on Leaderboard
                    </p>
                  </div>

                  {/* SCORE */}
                  <div className="bg-cyan-600/20 px-6 py-3 rounded-lg border border-cyan-400/20 text-center min-w-[140px]">
                    <p className="text-xs text-gray-400">SCORE</p>
                    <h2 className="text-2xl font-bold text-cyan-400">
                      {score.toLocaleString()}
                    </h2>
                    <p className="text-xs">{correct} correct</p>
                  </div>

                </div>
              </div>

              {/* CENTER */}
              <div className="flex flex-col items-center gap-3">

                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                >
                  🎮
                </motion.div>

                <p className="text-sm text-gray-400">
                  Gamified Quiz Achievement
                </p>

                <div className="flex gap-6 text-sm text-gray-300">
                  <span>⚡ {correct}</span>
                  <span>🔥 {streak}</span>
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex justify-between text-xs text-gray-400 border-t border-white/10 pt-2">
                <p>QuizMaster</p>
                <p>{date}</p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={downloadPDF}
        className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg shadow-md"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default Certificate;