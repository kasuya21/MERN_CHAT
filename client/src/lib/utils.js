// /**
//  * Format time to HH:MM format
//  */
// export const formatTime = (date) => {
//   if (!date) return "";
//   return new Date(date).toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// /**
//  * Format date with relative time (e.g., "Today", "Yesterday", "Mar 12")
//  */
// export const formatMessageDate = (date) => {
//   if (!date) return "";

//   const messageDate = new Date(date);
//   const today = new Date();
//   const yesterday = new Date(today);
//   yesterday.setDate(yesterday.getDate() - 1);

//   if (messageDate.toDateString() === today.toDateString()) {
//     return "Today";
//   } else if (messageDate.toDateString() === yesterday.toDateString()) {
//     return "Yesterday";
//   } else {
//     return messageDate.toLocaleDateString([], {
//       month: "short",
//       day: "numeric",
//     });
//   }
// };

// /**
//  * Validate file type (image only)
//  */
// export const isValidImageFile = (file) => {
//   if (!file) return false;
//   return file.type.startsWith("image/");
// };

// /**
//  * Validate file size (max 5MB)
//  */
// export const isValidFileSize = (file, maxSizeMB = 5) => {
//   if (!file) return false;
//   return file.size <= maxSizeMB * 1024 * 1024;
// };

// /**
//  * Get file size in human readable format
//  */
// export const formatFileSize = (bytes) => {
//   if (bytes === 0) return "0 Bytes";
//   const k = 1024;
//   const sizes = ["Bytes", "KB", "MB", "GB"];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
// };

// /**
//  * Truncate text with ellipsis
//  */
// export const truncateText = (text, maxLength = 50) => {
//   if (!text) return "";
//   return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
// };

// /**
//  * Get initials from name (e.g., "John Doe" → "JD")
//  */
// export const getInitials = (name) => {
//   if (!name) return "?";
//   return name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 2);
// };

// /**
//  * Check if user is online based on online users array
//  */
// export const isUserOnline = (userId, onlineUsers) => {
//   if (!userId || !onlineUsers) return false;
//   return onlineUsers.includes(String(userId));
// };
