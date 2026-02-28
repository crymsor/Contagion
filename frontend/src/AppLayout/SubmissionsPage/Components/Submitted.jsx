import AiEvaluationScore from "./AiEvaluationScore";

function Submitted({ name, description, status, family, threatLevel, aiScorePercentage, reviewCount, date }) {
  return (
    <>
      <div id="submittedUpperPart">
        <div id="submittedTitleLine">
          <h2 id="submittedName">{name}</h2>
          <p id="submittedStatus">{status}</p>
        </div>

        <h3 id="submittedDescription">{description}</h3>
      </div>

      <div id="submittedTags">
        <p id="submittedFamily">{family}</p>
        <p id="submittedThreatLevel">{threatLevel}</p>
      </div>

      <AiEvaluationScore percentage={aiScorePercentage} />

      <hr />

      <div id="submittedBottomPart">
        <div id="submittiedBottomLeft">
          <p id="submittedReviewCount">{reviewCount} peer reviews</p>
          <p id="submittedDividingCircle">•</p>
          <p id="submittedDate">{date}</p>
        </div>
        <div id="submittedBottomRightPart">
          <p id="submittedViewDetails">View Details</p>
        </div>
      </div>

    </>
  )
}

export default Submitted;
