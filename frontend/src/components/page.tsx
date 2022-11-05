import React from "react";

type Props = {
    title: string,
    children?: JSX.Element | JSX.Element[];
};

const Page: React.FC<Props> = ({title, children}) => {
    return (
        <div>
            <div className="max-w-2xl mx-auto my-2">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
                    <h1 className="pt-5 mb-2 text-2xl font-bold tracking-tight text-blue-800 pl-9">
                        {title}
                    </h1>
                    <div className="px-5">
                        <div className="container">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;