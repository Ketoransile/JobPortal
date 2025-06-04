// export default function Loading() {
//   return (
//     <div className="w-full h-screen flex items-center justify-center">
//       <div className="flex justify-center items-center space-x-2">
//         {[...Array(4)].map((_, i) => (
//           <div
//             key={i}
//             className="w-3 h-3 bg-blue-500 rounded-full animate-wave"
//             style={{
//               animationDelay: `${i * 0.1}s`,
//               animationDuration: "0.8s",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

import { LoadingSpinner } from "@/components/general/LoadingSpinner";

export default function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <LoadingSpinner />
    </div>
  );
}
