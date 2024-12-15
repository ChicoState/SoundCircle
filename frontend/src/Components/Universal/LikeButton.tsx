import { useEffect, useState } from "react";
import { MdFavoriteBorder, MdFavorite  } from "react-icons/md";
import { PostProperties } from "../Posts/post-main";

interface LikeButtonProps {
    likeCount: number
    triggered: boolean
    parentPost?: PostProperties
  }
  
  function LikeButton({likeCount, triggered, parentPost}: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState(triggered || false)
    const [count, setCount] = useState(likeCount)

    useEffect(() => {
      // If post, get likes
      if (parentPost) {

      }
    })

    const handleClick = () => {
      setIsLiked(!isLiked)
      setCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1))
      updateDatabase(count)
    }

    const updateDatabase = (count: number) => {
      // If post, set likes +1
      if (parentPost) {
        postUpdateRequest(count, parentPost)
      }
    }

    const postUpdateRequest = (count: number, post: PostProperties) => {

    }

    return(
      <div>
        <text className="text-post_mainText">
          {count}
        </text>
        <button onClick={handleClick}>
          <p className="absolute translate-y-[-18px]">
            {isLiked 
              ? <MdFavorite className="fill-post_likeColorFull w-6 h-6"/>
              : <MdFavoriteBorder className="fill-post_likeColorEmpty w-6 h-6"/>
            }
          </p>
        </button>
      </div>
    );
  }

  export default LikeButton;