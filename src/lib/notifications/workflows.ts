export type NotificationChannel = "in_app" | "email";

export interface WorkflowDefinition {
  key: string;
  label: string;
  description: string;
  availableChannels: NotificationChannel[];
  defaultChannels: NotificationChannel[];
  renderInApp: (data: Record<string, unknown>) => { title: string; body: string };
  renderEmail: (data: Record<string, unknown>) => { subject: string; html: string };
}

const str = (v: unknown, fallback = ""): string =>
  typeof v === "string" ? v : fallback;

/**
 * Declarative catalog of predefined workflows. This is the SINGLE source of
 * truth for what notifications an app can send. The seed (`seed.ts`) turns each
 * entry into a `NotificationWorkflowConfig` row (enabled=false by default).
 * Souped never sees this file — it reads the seeded rows from the DB.
 *
 * The skill instructs the agent to add entries here when a feature needs a new
 * notification, then place `notify("<key>", ...)` at the right code point.
 */
export const WORKFLOWS: WorkflowDefinition[] = [
  {
    key: "welcome",
    label: "Welcome",
    description: "Sent when a new user signs up.",
    availableChannels: ["in_app", "email"],
    defaultChannels: ["in_app", "email"],
    renderInApp: (data) => ({
      title: "Welcome!",
      body: str(data.body, "Thanks for signing up."),
    }),
    renderEmail: (data) => ({
      subject: "Welcome!",
      html: `<p>${str(data.body, "Thanks for signing up.")}</p>`,
    }),
  },
  {
    key: "generic-alert",
    label: "Generic alert",
    description: "Catch-all notification driven entirely by its payload (title + body).",
    availableChannels: ["in_app", "email"],
    defaultChannels: ["in_app"],
    renderInApp: (data) => ({
      title: str(data.title, "Notification"),
      body: str(data.body),
    }),
    renderEmail: (data) => ({
      subject: str(data.title, "Notification"),
      html: `<p>${str(data.body)}</p>`,
    }),
  },
  {
    key: "transactional",
    label: "Transactional",
    description: "Confirmation of an action (order, payment, password reset).",
    availableChannels: ["in_app", "email"],
    defaultChannels: ["email"],
    renderInApp: (data) => ({
      title: str(data.title, "Confirmation"),
      body: str(data.body),
    }),
    renderEmail: (data) => ({
      subject: str(data.title, "Confirmation"),
      html: `<p>${str(data.body)}</p>`,
    }),
  },
  {
    key: "team-activity",
    label: "Team activity",
    description: "Activity from teammates or collaborators.",
    availableChannels: ["in_app", "email"],
    defaultChannels: ["in_app"],
    renderInApp: (data) => ({
      title: str(data.title, "Team activity"),
      body: str(data.body),
    }),
    renderEmail: (data) => ({
      subject: str(data.title, "Team activity"),
      html: `<p>${str(data.body)}</p>`,
    }),
  },
];

export function getWorkflow(key: string): WorkflowDefinition | undefined {
  return WORKFLOWS.find((w) => w.key === key);
}
