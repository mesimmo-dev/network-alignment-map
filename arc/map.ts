import * as fs from "fs";
import * as path from "path";

interface NetworkRecord {
  project: string;
  need: string;
  stakeholderType: string;
  pathway: string;
  priority: string;
  nextStep: string;
}

const inputPath = path.join(__dirname, "..", "data", "sample_network.json");
const outputPath = path.join(__dirname, "..", "reports", "alignment_report.md");

function priorityRank(priority: string): number {
  const ranks: Record<string, number> = {
    High: 3,
    Medium: 2,
    Low: 1
  };
  return ranks[priority] || 0;
}

function main(): void {
  const raw = fs.readFileSync(inputPath, "utf8");
  const records: NetworkRecord[] = JSON.parse(raw);

  const sorted = records.sort(
    (a, b) => priorityRank(b.priority) - priorityRank(a.priority)
  );

  const lines: string[] = [
    "# Alignment Report",
    "",
    "Structured mapping of project needs to stakeholder types, pathways, and next-step recommendations.",
    ""
  ];

  sorted.forEach((record, index) => {
    lines.push(`## Record ${index + 1}`);
    lines.push("");
    lines.push(`- **Project:** ${record.project}`);
    lines.push(`- **Need:** ${record.need}`);
    lines.push(`- **Stakeholder Type:** ${record.stakeholderType}`);
    lines.push(`- **Pathway:** ${record.pathway}`);
    lines.push(`- **Priority:** ${record.priority}`);
    lines.push(`- **Next Step:** ${record.nextStep}`);
    lines.push("");
  });

  fs.writeFileSync(outputPath, lines.join("\n"));
  console.log(`Saved alignment report to ${outputPath}`);
}

main();
