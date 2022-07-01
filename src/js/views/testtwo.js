import { useContext } from "react";

export function testTwo() {
  const value = useContext(Context);
  return <span>{value}</span>;
}
