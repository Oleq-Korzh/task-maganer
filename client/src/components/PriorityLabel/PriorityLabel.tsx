import { PriorityLabelProps } from "./PriorityLabel.types";

import "./PriorityLabel.scss";

export default function PriorityLabel({ priority }: PriorityLabelProps) {
  return <strong className={"PriorityLabel_" + priority}>{priority}</strong>;
}
