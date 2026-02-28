import SearchBar from "./Components/SearchBar";
import Submitted from "./Components/Submitted";

function SubmissionsPage() {
  return (
    <>
      <p>Submissions</p>
      <SearchBar />
      <Submitted
        name={"WannaCry Ransomware Network Patterns"}
        description={"Analysis of network propagation patterns and SMB exploitation in WannaCry variants."}
        status={"Under Review"}
        family={"Ransomware"}
        threatLevel={"Critical"}
        aiScorePercentage={"98%"}
        reviewCount={2}
        date={"2024-02-13"}
      />
    </>
  )
};

export default SubmissionsPage;
