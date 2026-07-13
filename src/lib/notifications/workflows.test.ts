import { describe, it, expect } from "vitest";
import { WORKFLOWS, getWorkflow } from "./workflows";

describe("workflows catalog", () => {
  it("exposes at least the v1 workflow keys", () => {
    const keys = WORKFLOWS.map((w) => w.key);
    expect(keys).toContain("welcome");
    expect(keys).toContain("generic-alert");
  });

  it("only uses in_app/email channels", () => {
    for (const w of WORKFLOWS) {
      for (const c of w.availableChannels) {
        expect(["in_app", "email"]).toContain(c);
      }
    }
  });

  it("getWorkflow returns a renderable definition", () => {
    const w = getWorkflow("generic-alert");
    expect(w).toBeDefined();
    const inApp = w!.renderInApp({ title: "Hi", body: "There" });
    expect(inApp.title).toBe("Hi");
    expect(inApp.body).toBe("There");
  });

  it("getWorkflow returns undefined for unknown keys", () => {
    expect(getWorkflow("does-not-exist")).toBeUndefined();
  });
});
