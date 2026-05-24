// import { useEffect } from "react";

// import Dashboard from "./pages/Dashboard";

// import socket from "./services/socket";

// import useDeviceStore from "./store/deviceStore";

// export default function App() {
//   const updateStatus = useDeviceStore(
//     (s) => s.updateStatus
//   );

//   useEffect(() => {
//     socket.on(
//       "device-status",
//       (data) => {
//         updateStatus(
//           data.id,
//           data.status
//         );
//       }
//     );

//     return () => {
//       socket.off("device-status");
//     };
//   }, []);

//   return <Dashboard />;
// }

import Dashboard from "./pages/Dashboard";

function App() {
  return <Dashboard />;
}

export default App;