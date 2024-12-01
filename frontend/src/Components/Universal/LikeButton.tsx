import { useState } from "react";
import { MdFavoriteBorder, MdFavorite  } from "react-icons/md";

interface LikeButtonProps {
    likeCount: number
    triggered: boolean
  }
  
  function LikeButton({likeCount, triggered}: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState(triggered || false)
    const [count, setCount] = useState(likeCount)

    const handleClick = () => {
      setIsLiked(!isLiked)
      setCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1))
      // updateDatabase(count)
    }

    const updateDatabase = () => {

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