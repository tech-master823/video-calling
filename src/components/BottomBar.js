import { HiSpeakerWave } from "react-icons/hi2";
import { GoDeviceCameraVideo } from "react-icons/go";
import { MdSettingsVoice, MdOutlineMessage  } from "react-icons/md";
import { FaRegHandPaper } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { IoMdExit } from "react-icons/io";

const BottomBar = () => {
  return (
    <div className="w-full flex h-[60px] p-2 bg-white z-50">      
      <div className="w-full h-full flex justify-between items-center bg-slate-300 px-2 rounded-[5px] shadow-[gray_0px_0px_5px_3px]">
        <div className="flex gap-2 items-center h-full">          
          <button className="h-full px-2 hover:bg-slate-600 transition-colors"><HiSpeakerWave size={20} /></button>
          <button className="h-full px-2 hover:bg-slate-600 transition-colors"><GoDeviceCameraVideo size={20} /></button>
          <button className="h-full px-2 hover:bg-slate-600 transition-colors"><MdSettingsVoice size={20} /></button>
          <button className="h-full px-2 hover:bg-slate-600 transition-colors"><MdOutlineMessage size={20} /></button>
          <button className="h-full px-2 hover:bg-slate-600 transition-colors"><FiBookOpen size={20} /></button>
          <button className="h-full px-2 hover:bg-slate-600 transition-colors"><FaRegHandPaper size={20} /></button>
        </div>
        <button className="px-4 bg-blue-600 transition-colors h-[60%] flex items-center gap-1 font-bold rounded-[8px]">Exit <IoMdExit size={25} /></button>
      </div>
    </div>
  )
}

export default BottomBar;