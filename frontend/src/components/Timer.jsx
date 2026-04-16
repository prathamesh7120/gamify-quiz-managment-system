import { Clock } from "lucide-react";

export default function Timer({ timer }) {
  return (
    <div className="flex items-center gap-2 bg-[#111827] px-4 py-2 rounded-xl">
      <Clock className="w-5 h-5 text-cyan-400" />
      <span className="text-white">{timer}s</span>
    </div>
  );
}