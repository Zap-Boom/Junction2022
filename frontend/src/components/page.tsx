import React from "react";

type Props = {
  title: string;
  children?: JSX.Element | JSX.Element[];
  gradientBg: boolean;
};

const Page: React.FC<Props> = ({ title, children, gradientBg }) => {
  return (
    <div className="max-w-2xl mx-auto my-2">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
        <div className={gradientBg ? "frontPageContainer" : "pageContainer"}>
          <h1 className="pt-5 mb-2 text-2xl font-bold tracking-tight text-blue-800 pl-9">
            {title}
          </h1>
          <div className="px-5">
            <div className="container">
              {children}
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
