import React from "react";

type Props = {
  show: boolean;
  title: string;
};

const Button = (props: Props) => {
  const { show, title } = props;
  return show ? <button>{title}</button> : null;
};

export default Button;
