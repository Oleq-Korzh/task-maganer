import "./PriorityLabel.css";

interface PriorityLabelProps {
  priority: "HIGH" | "MEDIUM" | "LOW";
}

export default function PriorityLabel({ priority }: PriorityLabelProps) {
  return <strong className={"PriorityLabel_" + priority}>{priority}</strong>;
}
