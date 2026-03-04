import { useParams } from "react-router-dom";

function Post() {
  const { postId } = useParams();
  return (
    <>
      <p>Hi this is post number {postId}</p>
    </>
  )
}

export default Post;
