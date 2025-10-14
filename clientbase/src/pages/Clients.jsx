import ClientList from "../components/ClientList";
import Navbar from "../components/Navbar";

export default function Clients() {
    return (
        <>
            <div className="bg-background min-h-screen w-full">
                <Navbar></Navbar>

                <div className="pt-20 px-4 flex justify-center">
                    <div className="w-full max-w-[800px] min-w-[300px] overflow-hidden rounded-lg border border-gray-200 shadow-lg">
                        <ClientList></ClientList>
                    </div>
                </div>
            </div>
        </>
    );
}
