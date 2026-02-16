import React from "react";
import { motion } from "framer-motion";

const CommunityPanel = () => {
  return (
    <div className="hidden lg:flex w-1/2 bg-[#13161c] flex-col justify-center items-center p-12 relative overflow-hidden">
      {/* หัวใจเส้นวิ่ง */}
      <motion.svg
        width="400"
        height="400"
        viewBox="0 0 512 512"
        className="mb-12"
      >
        <motion.path
          d="M471.7 73.3c-54.5-46.4-136-38.5-186.4 13.7L256 116.6l-29.3-29.6C176.3 34.8 94.8 26.9 40.3 73.3c-62.8 53.5-66.1 149.8-9.9 207.8l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.2-58 52.9-154.3-9.9-207.8z"
          fill="transparent"
          stroke="#ff4d6d"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1500"
          animate={{ strokeDashoffset: [1500, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.svg>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center max-w-lg z-10"
      >
        <h2 className="text-3xl font-bold text-white mb-3">
          Join our community
        </h2>
        <p className="text-gray-400 leading-relaxed">
          Connect with friends, share moments, and stay in touch with your loved
          ones.
        </p>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#0f1216] to-transparent pointer-events-none"></div>
    </div>
  );
};

export default CommunityPanel;
