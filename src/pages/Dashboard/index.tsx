import Layout from "../../components/Layout";
import { useContext  } from "react";
import { ThemeContext } from "../../Context/ThemeProvider";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";


const Dashboard = () => {
    const { isSideBarVisible } = useContext(ThemeContext);

    return (
        <Layout>
            <div className="p-2 flex flex-col gap-4">
                <div className="bg-white w-full">
                    <div className={` p-4 space-y-4  ${isSideBarVisible ? 'bg-gray-200' : ''}`}>
                        <div className="flex justify-between items-center flex-wrap gap-4">
                            <div className="flex gap-2 items-center justify-center">
                                <h2 className="font-semibold text-xl"><span className="text-blue-500">Teachers</span> / <span>Jahir</span></h2>
                                <CgProfile className="w-6 h-6" />
                            </div>
                            <div>
                                <IoMdSettings className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full border-2 flex flex-col md:flex-row lg:flex-row">
                    <div className="w-full h-40 border-2"> </div>
                    <div className="w-full h-40 border-2"> </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
