import SearchBar from "./Components/SearchBar";
import Submitted from "./Components/Submitted";

function SubmissionsPage() {
  return (
    <div className="min-h-screen bg-abyss text-slate-100 px-6 py-12 md:px-12 lg:px-20">

      {/* Header Section */}
      <div className="flex flex-row justify-between items-end mb-10 pb-6 border-b border-phantom">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-toxic shadow-[0_0_8px_#22C55E]"></div>
            <h3 className="text-3xl font-black text-slate-100 tracking-tighter uppercase">
              My Submissions
            </h3>
          </div>
          <p className="text-slate-400 text-sm font-medium ml-3">
            Manage and track your malware analysis reports
          </p>
        </div>

        <button className="group relative flex items-center gap-2 bg-toxic hover:bg-green-400 text-void font-black px-6 py-3 rounded-sm transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 shadow-[0_4px_0_0_#0F4014]">
          <span className="text-xl leading-none">+</span>
          <span className="uppercase tracking-widest text-[10px]">New Submission</span>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/20 rotate-45"></div>
        </button>
      </div>

      <div className="mb-12">
        <SearchBar />
      </div>

      {/* --- GRID LAYOUT START --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">

        {/* Full-width Section Header */}
        <div className="col-span-full flex items-center gap-4 mb-2">
          <span className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em]">Query Results</span>
          <div className="h-[1px] flex-grow bg-phantom"></div>
        </div>

        {/* Box 1 */}
        <Submitted
          name={"WannaCry Network Patterns"}
          description={"Analysis of SMB exploitation in WannaCry variants."}
          status={"Under Review"}
          family={"Ransomware"}
          threatLevel={"Critical"}
          aiScorePercentage={"98%"}
          reviewCount={2}
          date={"2024-02-13"}
        />

        {/* Box 2 */}
        <Submitted
          name={"Emotet Payload Delivery"}
          description={"Investigation into obfuscated VBA macros in attachments."}
          status={"Approved"}
          family={"Trojan"}
          threatLevel={"High"}
          aiScorePercentage={"84%"}
          reviewCount={5}
          date={"2024-02-10"}
        />

        {/* Box 3 */}
        <Submitted
          name={"Stuxnet PLC Logic"}
          description={"Deep dive into industrial control system manipulation."}
          status={"Archived"}
          family={"Worm"}
          threatLevel={"Critical"}
          aiScorePercentage={"100%"}
          reviewCount={12}
          date={"2024-01-25"}
        />

        {/* Box 4 */}
        <Submitted
          name={"Cobalt Strike Beacon"}
          description={"Detecting memory-resident beacons in enterprise traffic."}
          status={"Under Review"}
          family={"APT"}
          threatLevel={"Elevated"}
          aiScorePercentage={"72%"}
          reviewCount={1}
          date={"2024-02-15"}
        />
      </div>
      {/* --- GRID LAYOUT END --- */}

    </div>
  )
};

export default SubmissionsPage;
