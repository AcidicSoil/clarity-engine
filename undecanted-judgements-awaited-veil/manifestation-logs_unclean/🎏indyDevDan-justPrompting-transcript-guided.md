Alright, let's break down the developer's steps verbatim from the video and format them as a guide. Keep in mind that some actions were described rather than explicitly typed out as commands.

## **Developer's Guide to Implementing a Feature with Agentic Coding (Based on Indydev Dan's Workflow)**

This guide outlines the steps Indydev Dan took to implement the "require ID" feature in the Pocket Pick application using Claude Code and the three essential folders.

**I. Project Setup and Initial Understanding**

1. **Open Codebase:** The developer starts by opening the Pocket Pick codebase in their chosen AI coding environment (Claude Code in this case).
2. **Brief Explanation:** The developer provides a brief overview of the Pocket Pick application and the desired feature change (making the id parameter mandatory for the add and add file commands).
3. **Locate Relevant Code:** The developer navigates to the data types definition to show the current parameters for adding items.

**II. Context Priming**

1. **Execute Context Priming Command:** The developer uses a predefined command (likely within the .claude/commands directory) to prime the AI agent with the project context.
   * /\<context priming command name\> (In the video, he types / and selects the "basic context prime" which he refers to as "prime").
2. **Observe Context Loading:** The developer observes the agent running through the context priming steps (e.g., git ls-files, reading specified files like README.md).
3. **Check Context Cost (Optional):** The developer uses a command to see the token usage for the context priming.
   * /cost

**III. Plan Drafting**

1. **Initiate Plan Drafting:** The developer uses a prompt to instruct the AI agent to create a first draft of the plan.
   * create specs/require ID a new feature ID stir inside of the
   * (Referring back to the README.md for light planning) we want this inside of the pocket ad and the pocket break the plan into these sections write this plan
   * (Uses ultrathink which he acknowledges is "definitely overkill" but intended to trigger Claude Code's reasoning capabilities).
2. **Review Drafted Plan:** The developer examines the generated specs/require\_id.md file.
   * He reads through the problem statement, solution statement, proposed code changes (server module, add functionality, server implementation), test changes, self-validation section, and updates to the README.
3. **Refine the Plan:** The developer makes manual edits to the drafted plan.
   * **Deletes Extra Information:** Removes recommendations and optional ideas (specifically mentions deleting "schema stuff").
   * **Adds Specific Instruction:** Includes a new instruction: "Check the other tests to see if they're using any ad functionality and update them to use this."
   * **Clarifies File Paths (Optional):** Explicitly opens a file path in the plan for clarity.

**IV. Committing the Plan**

1. **Stage Changes:** The developer stages the newly created specs/require\_id.md file.
2. **Commit Plan:** The developer commits the plan to version control with a descriptive message.
   * (Verbalizes the intention to commit the plan before operating on it).

**V. Implementing the Plan**

1. **Instruct Agent to Implement:** The developer uses a command to tell the agent to execute the plan defined in the specs/require\_id.md file.
   * implement this file
2. **Observe Agent Execution:** The developer watches as the AI agent works through the plan, making code changes across multiple files.
3. **Automatic Acceptance (YOLO Mode):** The developer has auto-accept mode enabled, allowing the agent to proceed without constant confirmation.
   * (Mentions going into "agentic mode or yolo mode" and turning on "auto accepts").

**VI. Self-Validation and Review**

1. **Observe Self-Validation:** The developer notes the agent running tests to validate the implemented changes.
2. **Review Summary (Optional):** The agent provides a summary of the work done.
3. **Manual Inspection (If Necessary):** The developer mentions briefly looking at a failed test (test\_find.py) side-by-side to understand the issue.

**VII. Testing the Updated Feature (Manual)**

1. **Run Updated MCP Server:** The developer activates the updated Pocket Pick MCP server.
   * (Uses a command within Claw Code to do this, likely related to the .claude/commands).
2. **Use Updated pocket add Command:** The developer uses the pocket add command with the new mandatory id parameter.
   * pocket add id mcp\_json content \<JSON content\>
3. **Verify Added Item with pocket to file by ID:** The developer uses the pocket to file by ID command to retrieve the added item using its ID.
   * pocket to file by ID id mcp\_json output file absolute/path/to/mcpnew.json
4. **Open Output File:** The developer opens the generated file (mcpnew.json) to confirm the feature is working as expected.

This step-by-step guide captures the developer's workflow as demonstrated in the video, highlighting the interaction with the AI coding tool and the use of the three essential folders. Remember that specific commands might vary depending on the AI coding tool being used.