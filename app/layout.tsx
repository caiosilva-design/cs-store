import Navbar from "./components/Navbar";
import WhatsappButton from "./components/WhatsappButton";
export default function RootLayout({ children }: any) {
 return (
<html>
<body>
<Navbar />
       {children}
<WhatsappButton />
</body>
</html>
 );
}
