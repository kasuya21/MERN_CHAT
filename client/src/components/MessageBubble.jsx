const MessageBubble = ({ message, isSender }) => {
  return (
    <div className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}>
      {/* BUBBLE */}
      <div
        className={`
        relative inline-block 
        max-w-[65%] 
        px-3 py-1.5 
        text-sm 
        break-words 
        whitespace-pre-wrap
        ${
          isSender
            ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl rounded-br-md"
            : "bg-[#1f242c] text-gray-200 rounded-2xl rounded-bl-md"
        }
        `}
      >
        {message.file && (
          <img
            src={message.file}
            alt="attachment"
            className="rounded-lg mb-1 max-w-[220px] max-h-[220px] object-cover"
          />
        )}

        {message.text && <p className="leading-snug">{message.text}</p>}

        {/* TAIL */}
        {isSender && (
          <div className="absolute -right-1 bottom-0 w-2 h-2 bg-pink-500 rotate-45"></div>
        )}

        {!isSender && (
          <div className="absolute -left-1 bottom-0 w-2 h-2 bg-[#1f242c] rotate-45"></div>
        )}
      </div>

      {/* TIME */}
      {message.createdAt && (
        <span className="text-[10px] text-gray-400 mt-0.5">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      )}
    </div>
  );
};

export default MessageBubble;
