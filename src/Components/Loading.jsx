import React from "react";
import { Skeleton } from "@mui/material";
import { grey, red } from "@mui/material/colors";
// import { Stack } from '@mui/material/Stack '

const Loading = () => {
  const skeletonStyle = {
    backgroundColor: "#1E1F29",
  };

  return (
    <div className="flex  w-[85%] pt-5  items-center justify-center  m-auto">
      <div className=" w-[30%]  flex flex-col ">
        <Skeleton
          sx={{ ...skeletonStyle, borderRadius: "5px" }}
          variant="rectangular"
          width={300}
          height={158}
        />
        <div className="flex items-center gap-2 justify-center">
          <div className="w-[15%]">
            <Skeleton
              sx={skeletonStyle}
              variant="circular"
              width={50}
              height={50}
            />
          </div>
          <div className="   w-[85%]">
            <Skeleton sx={skeletonStyle} width={"70%"} />
            <Skeleton sx={skeletonStyle} width={"60%"} />
            <Skeleton sx={skeletonStyle} width={"50%"} />
          </div>
        </div>
      </div>

      <div className=" w-[30%]  flex flex-col ">
        <Skeleton
          sx={{ ...skeletonStyle, borderRadius: "5px" }}
          variant="rectangular"
          width={300}
          height={158}
        />
        <div className="flex items-center gap-2 justify-center">
          <div className="w-[15%]">
            <Skeleton
              sx={skeletonStyle}
              variant="circular"
              width={50}
              height={50}
            />
          </div>
          <div className="   w-[85%]">
            <Skeleton sx={skeletonStyle} width={"70%"} />
            <Skeleton sx={skeletonStyle} width={"60%"} />
            <Skeleton sx={skeletonStyle} width={"50%"} />
          </div>
        </div>
      </div>

      <div className=" w-[30%] flex flex-col ">
        <Skeleton
          sx={{ ...skeletonStyle, borderRadius: "5px" }}
          variant="rectangular"
          width={300}
          height={158}
        />
        <div className="flex items-center gap-2 justify-center">
          <div className="w-[15%]">
            <Skeleton
              sx={skeletonStyle}
              variant="circular"
              width={50}
              height={50}
            />
          </div>
          <div className="   w-[85%]">
            <Skeleton sx={skeletonStyle} width={"70%"} />
            <Skeleton sx={skeletonStyle} width={"60%"} />
            <Skeleton sx={skeletonStyle} width={"50%"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
