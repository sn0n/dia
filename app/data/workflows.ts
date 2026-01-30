export const complexWorkflows = {
  "Getting Things Done (GTD)": {
    type: "linear",
    root: {
      label: "Stuff in Inbox",
      type: "start",
      next: {
        label: "Is it actionable?",
        type: "decision",
        branches: [
          {
            label: "No",
            path: {
              label: "Eliminate / Incubate / Reference",
              type: "end",
              color: "red"
            }
          },
          {
            label: "Yes",
            path: {
              label: "Will it take < 2 mins?",
              type: "decision",
              branches: [
                {
                  label: "Yes",
                  path: { label: "Do it immediately", type: "action", color: "emerald" }
                },
                {
                  label: "No",
                  path: {
                    label: "Am I the right person?",
                    type: "decision",
                    branches: [
                      { label: "No", path: { label: "Delegate", type: "action" } },
                      { label: "Yes", path: { label: "Defer (Calendar/Next Actions)", type: "action" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  },
  "The Pomodoro Technique": {
    type: "linear",
    root: {
      label: "Pick a Task",
      type: "start",
      next: {
        label: "Set Timer 25m",
        type: "action",
        next: {
          label: "Work until ring",
          type: "action",
          next: {
            label: "Checkmark paper",
            type: "action",
            next: {
              label: "4 Checkmarks?",
              type: "decision",
              branches: [
                { label: "No", path: { label: "Short Break (5m)", type: "action", loop: true } },
                { label: "Yes", path: { label: "Long Break (20-30m)", type: "end", color: "emerald" } }
              ]
            }
          }
        }
      }
    }
  },
  "Eisenhower Matrix": {
    type: "linear",
    root: {
      label: "Incoming Task",
      type: "start",
      next: {
        label: "Is it Urgent?",
        type: "decision",
        branches: [
          {
            label: "Yes",
            path: {
              label: "Is it Important?",
              type: "decision",
              branches: [
                { label: "Yes", path: { label: "DO (Do it now)", type: "end", color: "emerald" } },
                { label: "No", path: { label: "DELEGATE (Who can do it?)", type: "end", color: "amber" } }
              ]
            }
          },
          {
            label: "No",
            path: {
              label: "Is it Important?",
              type: "decision",
              branches: [
                { label: "Yes", path: { label: "DECIDE (Schedule it)", type: "end", color: "blue" } },
                { label: "No", path: { label: "DELETE (Eliminate it)", type: "end", color: "red" } }
              ]
            }
          }
        ]
      }
    }
  },
  "Scientific Method": {
    type: "linear",
    root: {
      label: "Observation",
      type: "start",
      next: {
        label: "Hypothesis",
        type: "action",
        next: {
          label: "Experiment",
          type: "action",
          next: {
            label: "Analyze Data",
            type: "decision",
            branches: [
              { label: "Results align?", path: { label: "Theory Supported", type: "end", color: "emerald" } },
              { label: "Mismatch?", path: { label: "Revise Hypothesis", type: "action", loop: true } }
            ]
          }
        }
      }
    }
  },
  "Lean Startup": {
    type: "linear",
    root: {
      label: "Idea",
      type: "start",
      next: {
        label: "Build MVP",
        type: "action",
        next: {
          label: "Measure (Data)",
          type: "action",
          next: {
            label: "Learn",
            type: "decision",
            branches: [
              { label: "Value Proven?", path: { label: "Persevere (Scale)", type: "end", color: "emerald" } },
              { label: "No Traction?", path: { label: "Pivot (Change Strategy)", type: "action", loop: true } }
            ]
          }
        }
      }
    }
  },
  "PID Controller": {
    type: "nonlinear",
    root: {
      label: "Set Point (Target)",
      type: "start",
      next: {
        label: "Calculate Error",
        note: "(Target - Current)",
        type: "action",
        next: {
          label: "Apply Corrections (Parallel)",
          type: "parallel",
          branches: [
            { label: "P", path: { label: "Proportional (Present)", type: "sub" } },
            { label: "I", path: { label: "Integral (Past)", type: "sub" } },
            { label: "D", path: { label: "Derivative (Future)", type: "sub" } }
          ],
          next: {
            label: "Sum Output",
            type: "action",
            next: {
              label: "Update Process",
              type: "action",
              next: { label: "Measure New State", type: "action", loop: true }
            }
          }
        }
      }
    }
  },
  "OODA Loop": {
    type: "nonlinear",
    root: {
      label: "Unfolding Circumstances",
      type: "start",
      next: {
        label: "OBSERVE",
        type: "action",
        next: {
          label: "ORIENT",
          note: "(Culture, Genetics, Analysis)",
          type: "decision",
          branches: [
            { label: "New Info", path: { label: "Feedback to Observe", type: "action", loop: true } },
            { label: "Hypothesis", path: {
                label: "DECIDE",
                type: "action",
                next: {
                  label: "ACT",
                  type: "action",
                  next: { label: "Change Environment", type: "end", loop: true }
                }
            }}
          ]
        }
      }
    }
  },
  "START Triage": {
    type: "nonlinear",
    root: {
      label: "Patient Entry",
      type: "start",
      next: {
        label: "Able to Walk?",
        type: "decision",
        branches: [
          { label: "Yes", path: { label: "MINOR (Green)", type: "end", color: "emerald" } },
          { label: "No", path: {
              label: "Breathing?",
              type: "decision",
              branches: [
                { label: "No", path: { label: "Position Airway. Breathing?", type: "decision", branches: [
                   { label: "No", path: { label: "DECEASED (Black)", type: "end", color: "zinc" } },
                   { label: "Yes", path: { label: "IMMEDIATE (Red)", type: "end", color: "red" } }
                ]}},
                { label: "Yes", path: {
                    label: "Resp Rate > 30?",
                    type: "decision",
                    branches: [
                       { label: "Yes", path: { label: "IMMEDIATE (Red)", type: "end", color: "red" }},
                       { label: "No", path: { label: "DELAYED (Yellow)", type: "end", color: "amber" }}
                    ]
                }}
              ]
          }}
        ]
      }
    }
  },
  "Decision Tree": {
    type: "nonlinear",
    root: {
      label: "Opportunity",
      type: "start",
      next: {
        label: "High Cost?",
        type: "decision",
        branches: [
          { label: "Yes", path: {
              label: "High Reward?",
              type: "decision",
              branches: [
                { label: "Yes", path: { label: "Strategic Bet", type: "end", color: "purple" } },
                { label: "No", path: { label: "Avoid", type: "end", color: "red" } }
              ]
          }},
          { label: "No", path: {
             label: "Quick Win?",
             type: "decision",
             branches: [
               { label: "Yes", path: { label: "Do Immediately", type: "end", color: "emerald" } },
               { label: "No", path: { label: "Backlog", type: "end", color: "zinc" } }
             ]
          }}
        ]
      }
    }
  },
  "Circuit Breaker": {
    type: "nonlinear",
    root: {
      label: "Service Request",
      type: "start",
      next: {
        label: "State is Open?",
        type: "decision",
        branches: [
          { label: "Yes (Broken)", path: { label: "Fast Fail / Fallback", type: "end", color: "red" } },
          { label: "No (Closed)", path: {
             label: "Call Service",
             type: "action",
             next: {
               label: "Success?",
               type: "decision",
               branches: [
                 { label: "Yes", path: { label: "Return Data", type: "end", color: "emerald" } },
                 { label: "No", path: { label: "Increment Fail Count", type: "action", next: {
                    label: "Threshold Met?",
                    type: "decision",
                    branches: [
                      { label: "Yes", path: { label: "Trip Breaker (Open)", type: "end", color: "red" } },
                      { label: "No", path: { label: "Return Error", type: "end", color: "amber" } }
                    ]
                 }}}
               ]
             }
          }}
        ]
      }
    }
  }
};

export const rawLinearData = [
  "Getting Things Done (GTD)|Capture → Clarify → Organize → Reflect → Engage|Productivity",
  "The Pomodoro Technique|Set Goal → Work (25m) → Short Break (5m) → Repeat x4 → Long Break|Productivity",
  "Eisenhower Matrix|Categorize Urgency/Importance → Do → Decide → Delegate → Delete|Productivity",
  "Eat The Frog|Identify Hardest Task → Do First Thing → Move to Smaller Tasks|Productivity",
  "Time Blocking|List Tasks → Estimate Time → Assign Calendar Slots → Execute|Productivity",
  "Kanban|Backlog → To Do → In Progress → Review → Done|Productivity",
  "The 2-Minute Rule|Task < 2 mins? → Do Immediately → Task > 2 mins? → Defer/Delegate|Productivity",
  "Zero-Based Scheduling|List Available Hours → Assign Every Hour a Function → 0 Hours Remain|Productivity",
  "Biological Prime Time|Track Energy 1 Week → Identify Peaks → Schedule Deep Work → Admin in Troughs|Productivity",
  "Batching|Group Similar Tasks → Schedule Block → Execute Consecutively|Productivity",
  "Must/Should/Want|List Tasks → Label 'Must' → Label 'Should' → Label 'Want'|Productivity",
  "Ivy Lee Method|List 6 Tasks → Prioritize 1-6 → Start #1 → Work until Done → Repeat|Productivity",
  "Seinfeld Strategy|Pick Habit → Complete Daily → Mark X on Calendar → Don't Break Chain|Productivity",
  "Inbox Zero|Process Item → Delete? → Delegate? → Respond (<2m)? → Defer?|Productivity",
  "Pareto Analysis (80/20)|List Inputs → Identify Top 20% → Focus Solely on Top 20%|Productivity",
  "The 5 Whys|State Problem → Ask 'Why?' → Answer → Ask 'Why?' again → Repeat 5x → Root Cause|Problem Solving",
  "Fishbone Diagram|Define Effect → Draw Spine → Categorize Causes (Man/Machine/etc) → Brainstorm Sub-causes|Problem Solving",
  "DMAIC (Six Sigma)|Define → Measure → Analyze → Improve → Control|Problem Solving",
  "8D (Eight Disciplines)|Form Team → Describe Problem → Containment → Root Cause → Corrective Action → Validate → Prevent → Recognize|Problem Solving",
  "PDCA (Deming Cycle)|Plan (Hypothesize) → Do (Test) → Check (Analyze) → Act (Implement)|Problem Solving",
  "TRIZ|Define Specific Problem → Match to General Problem → Find General Solution → Adapt to Specific|Problem Solving",
  "Cynefin Framework|Sense → Categorize → Respond (Simple) OR Sense → Analyze → Respond (Complicated)|Problem Solving",
  "First Principles|Deconstruct to Truths → Question Assumptions → Reconstruct Solution|Problem Solving",
  "Inversion|Define Goal → Define Failure Mode → Avoid Failure Steps|Problem Solving",
  "Rubber Duck Debugging|Get Duck → Explain Code Line-by-Line → Self-Correct|Problem Solving",
  "Kepner-Tregoe Matrix|Situation Appraisal → Problem Analysis → Decision Analysis → Potential Problem Analysis|Problem Solving",
  "A3 Problem Solving|Background → Current Condition → Goal → Root Cause → Countermeasures → Confirmation → Follow-up|Problem Solving",
  "CATWOE|Customers → Actors → Transformation → Worldview → Owners → Environment|Problem Solving",
  "OODA Loop|Observe → Orient → Decide → Act|Strategy",
  "SWOT Analysis|Analyze Internal (Strengths/Weaknesses) → Analyze External (Opportunities/Threats) → Match|Strategy",
  "Regret Minimization|Project to Age 80 → Ask 'Will I Regret This?' → Minimize Regret|Strategy",
  "SPADE|Setting → People → Alternatives → Decide → Explain|Strategy",
  "WRAP|Widen Options → Reality Test → Attain Distance → Prepare to be Wrong|Strategy",
  "Blue Ocean Strategy|Eliminate Factors → Reduce Factors → Raise Factors → Create Factors (ERRC)|Strategy",
  "Porter's Five Forces|Supplier Power → Buyer Power → Rivalry → Substitution → New Entry|Strategy",
  "PESTLE Analysis|Political → Economic → Social → Technological → Legal → Environmental|Strategy",
  "Eisenhardt's Options|Develop Option A → Develop Option B → Develop Option C → Compare Trade-offs → Select|Strategy",
  "RICE Score|Calculate (Reach × Impact × Confidence) / Effort → Sort by Score|Strategy",
  "Scenario Planning|Identify Drivers → Create Uncertainties Matrix → Develop 4 Scenarios → Strategy for Each|Strategy",
  "Pre-Mortem|Assume Failure → Brainstorm Reasons → Create Prevention Plan → Execute|Strategy",
  "BATNA|Determine Best Alternative → Set Reservation Price → Negotiate|Strategy",
  "Cost-Benefit Analysis|List Costs → List Benefits → Assign Values → Calculate Net|Strategy",
  "Design Thinking|Empathize → Define → Ideate → Prototype → Test|Creativity",
  "SCAMPER|Substitute → Combine → Adapt → Modify → Put to use → Eliminate → Reverse|Creativity",
  "Six Thinking Hats|White (Data) → Red (Emotion) → Black (Caution) → Yellow (Optimism) → Green (Creative) → Blue (Control)|Creativity",
  "Lateral Thinking|Select Focus → Generate Provocation → Move to New Idea|Creativity",
  "Crazy 8s|Fold Paper 8x → Sketch 8 Ideas (8 mins) → Review|Creativity",
  "Double Diamond|Discover (Diverge) → Define (Converge) → Develop (Diverge) → Deliver (Converge)|Creativity",
  "Disney Strategy|The Dreamer → The Realist → The Critic|Creativity",
  "Snowflake Method|One Sentence → One Paragraph → Character Sheets → Scene List → First Draft|Creativity",
  "Hero's Journey|Call to Adventure → Threshold → Challenges → Abyss → Transformation → Return|Creativity",
  "Synectics|Identify Problem → Make Strange Familiar → Make Familiar Strange → Force Connections|Creativity",
  "Scientific Method|Observe → Question → Hypothesize → Experiment → Analyze → Conclusion|Science",
  "Feynman Technique|Choose Concept → Teach to Child → Identify Gaps → Review Source → Simplify|Learning",
  "Socratic Method|Make Claim → Ask Probing Questions → Reveal Contradictions → Refine Claim|Thinking",
  "SQ3R|Survey → Question → Read → Recite → Review|Learning",
  "Spaced Repetition|Learn → Review (1 day) → Review (3 days) → Review (1 week) → Review (1 month)|Learning",
  "Bloom's Taxonomy|Remember → Understand → Apply → Analyze → Evaluate → Create|Learning",
  "Ladder of Inference|Data → Select Data → Interpret → Assume → Conclude → Believe → Act|Thinking",
  "Hanlon's Razor|Observe Negative Outcome → Question Malice → Default to Incompetence|Thinking",
  "Double-Loop Learning|Action → Result → Mismatch? → Question Assumptions → New Action|Learning",
  "Zettelkasten|Fleeting Notes → Permanent Notes (One Idea) → Link to Existing → Review Connections|Learning",
  "Scrum|Backlog → Sprint Planning → Sprint (Standups) → Review → Retrospective|Agile",
  "Waterfall|Requirements → Design → Implementation → Verification → Maintenance|Agile",
  "TDD|Write Fail Test → Write Code → Pass Test → Refactor|Agile",
  "DevOps Cycle|Plan → Code → Build → Test → Release → Deploy → Operate → Monitor|Agile",
  "Lean Startup|Build (MVP) → Measure (Data) → Learn (Pivot/Persevere)|Agile",
  "Non-Violent Comm.|Observe (No Judgment) → Identify Feeling → Identify Need → Make Request|Emotional",
  "CBT Cycle|Trigger → Automatic Thought → Emotion → Behavior → Challenge Thought|Emotional",
  "Crucial Conversations|Start with Heart → Learn to Look → Make it Safe → State Path → Explore Others|Emotional",
  "Grief Cycle|Denial → Anger → Bargaining → Depression → Acceptance|Emotional",
  "Transactional Analysis|Identify Ego State (Parent/Adult/Child) → Identify Transaction → Shift to Adult|Emotional",
  "Active Listening|Listen → Pause → Paraphrase → Confirm Understanding|Emotional",
  "Radical Candor|Care Personally + Challenge Directly → Feedback|Emotional",
  "Win-Win Negotiation|Separate People from Problem → Focus on Interests → Invent Options → Use Objective Criteria|Emotional"
];

export const rawNonLinearData = [
  "PID Controller|Measure → Calculate Error → Apply Correction → Loop|Systems",
  "Theory of Constraints|Identify Constraint → Exploit → Subordinate → Elevate → Loop|Systems",
  "The Flywheel Effect|Applied Effort → Build Momentum → Breakthrough → Reduced Effort → Loop|Systems",
  "Kaizen|Standardize → Measure → Compare → Innovate → Standardize (Loop)|Systems",
  "The Habit Loop|Cue (Trigger) → Routine (Behavior) → Reward → Craving (Loop)|Systems",
  "Positive Feedback|Event A → Produces B → Amplifies A → Exponential Growth|Systems",
  "Negative Feedback|Event A → Produces B → Reduces A → Stability|Systems",
  "The Hook Model|Trigger → Action → Variable Reward → Investment → Trigger (Loop)|Systems",
  "Boyd's E-M Theory|Energy State → Trade for Position/Speed → Regain Energy → Loop|Systems",
  "Triple-Loop Learning|Result → Action (Single) → Assumptions (Double) → Identity (Triple)|Systems",
  "Effectuation|Means → Affordable Loss → Contingencies → New Means → Loop|Systems",
  "Decision Tree|Node → Branch A (Prob X) / Branch B (Prob Y) → Outcome → Value|Logic",
  "Binary Search|Sort List → Pick Middle → Target < Middle? (Left) : Target > Middle? (Right)|Logic",
  "Minimax Algorithm|Look Ahead → Maximize My Gain → Minimize Opponent Gain → Select|Logic",
  "Fault Tree Analysis|Undesired Event → Logic Gate (OR/AND) → Lower Events → Root Causes|Logic",
  "Event Tree Analysis|Initiating Event → System A Works? (Yes/No) → System B Works? (Yes/No) → Consequence|Logic",
  "START Triage|Walking? (Green) → Breathing? (No=Black/Yes=Red) → Pulse? (Red) → Cap Refill?|Logic",
  "Genetic Algorithm|Init Pop → Evaluate Fitness → Select → Crossover/Mutate → New Gen → Loop|Logic",
  "Monte Carlo Sim|Define Domain → Generate Random Inputs → Loop x10k → Aggregate → Probability|Logic",
  "If-Then-Else|Condition Met? → True Path ↔ Condition Failed? → False Path|Logic",
  "Switch/Case|Input Variable → Case 1? → Case 2? → Case 3? → Default|Logic",
  "Recursion|Function Call → Base Case Met? (Return) : Loop Deeper (Call Self)|Logic",
  "STRIDE|Inspect Flow → Branch: Spoofing? Tampering? Repudiation? Info Disclosure? DoS?|Logic",
  "Spiral Model|Objectives → Risks → Develop/Test → Plan Next → Loop (Expand)|Iterative",
  "Hermeneutic Circle|Understand Part → Understand Whole → Re-interpret Part → Re-interpret Whole → Loop|Iterative",
  "Bayesian Updating|Prior Belief → New Evidence → Likelihood → Posterior Belief (New Prior) → Loop|Iterative",
  "Design Sprint|Map (Mon) → Sketch (Tue) → Decide (Wed) → Prototype (Thu) → Test (Fri)|Iterative",
  "Gartner Hype Cycle|Trigger → Peak Expectations → Trough Disillusionment → Slope Enlightenment → Plateau|Iterative",
  "Product Life Cycle|Intro → Growth → Maturity → Saturation → Decline → Extension/Death|Iterative",
  "Transtheoretical Model|Pre-contemplation → Contemplation → Preparation → Action → Maintenance → Relapse (Loop)|Iterative",
  "Kolb's Learning|Experience → Reflection → Conceptualization → Experimentation → Loop|Iterative",
  "Gibbs' Cycle|Description → Feelings → Evaluation → Analysis → Action Plan → Loop|Iterative",
  "Newton-Raphson|Guess Root → Calculate Tangent → Find Intercept → New Guess → Loop|Iterative",
  "Growth Hacking|Analyze Data → Ideate → Prioritize (ICE) → Test → Analyze → Loop|Iterative",
  "The 'V' Model|Reqs (Down) → Design (Down) → Code → Unit Test (Up) → System Test (Up)|Management",
  "RACI Matrix|Task → Responsible? → Accountable? → Consulted? → Informed?|Management",
  "Situational Leadership|Diagnose Level → Directing? → Coaching? → Supporting? → Delegating?|Management",
  "Cynefin (Logic)|Simple (Categorize) → Complicated (Analyze) → Complex (Probe) → Chaotic (Act)|Management",
  "Swiss Cheese Model|Hazard → Layer 1 (Hole?) → Layer 2 (Hole?) → Layer 3 (Hole?) → Accident|Management",
  "Balanced Scorecard|Financial ↔ Customer ↔ Internal Process ↔ Learning/Growth (Loop)|Management",
  "McKinsey 7S|Strategy ↔ Structure ↔ Systems ↔ Shared Values ↔ Style ↔ Staff ↔ Skills|Management",
  "Critical Path Method|List Tasks → Define Dependencies → Calculate Longest Path → Identify Float|Management",
  "PERT|Task → (Optimistic + 4*Likely + Pessimistic) / 6 → Weighted Avg|Management",
  "5S System|Sort → Set in Order → Shine → Standardize → Sustain (Loop)|Management",
  "MapReduce|Map (Split/Parallel) → Shuffle (Sort) → Reduce (Aggregate)|Management",
  "Git Flow|Main → Develop → Feature Branch (Loop) → Release → Merge Main|Management",
  "Hegelian Dialectic|Thesis → Antithesis (Conflict) → Synthesis (Resolution) → Loop|Philosophy",
  "The Work|Is it true? → Can you know? → Reaction? → Who without thought? → Turnaround|Philosophy",
  "Flow State Cycle|Struggle (Load) → Release (Disengage) → Flow (Peak) → Recovery → Loop|Philosophy",
  "Maslow's Hierarchy|Physio Met? → Safety Met? → Love Met? → Esteem Met? → Self-Act|Philosophy",
  "ABCDE Model|Activating Event → Belief → Consequence → Disputation → Effect|Philosophy",
  "WOOP|Wish → Outcome → Obstacle → Plan (If Obstacle -> Then Action)|Philosophy",
  "Kübler-Ross Loop|Denial → Anger → Bargaining → Depression → Acceptance|Philosophy",
  "Self-Fulfilling Prophecy|Belief → Action → Impact Others → Others' Belief → Others' Action → Reinforce|Philosophy",
  "Imposter Syndrome|Task → Anxiety → Over-prep/Procrastinate → Success → Discount → Loop|Philosophy",
  "ETL Process|Extract (Source) → Transform (Clean) → Load (Warehouse) → Analyze|Data",
  "Saga Pattern|Service A → Success? (Next) : Fail? (Compensate A/Undo)|Tech",
  "Red-Green-Refactor|Write Red Test (Fail) → Write Code (Pass) → Refactor → Loop|Tech",
  "Chaos Engineering|Steady State → Introduce Turbulence → Observe System → Improve → Loop|Tech",
  "Pub/Sub|Publisher → Message → Topic → Subscriber A (Parallel) / Subscriber B (Parallel)|Tech",
  "Circuit Breaker|Request → Failures > Threshold? → Open Circuit (Block) → Timeout → Half-Open (Test)|Tech",
  "MVC|User Action → Controller → Model Update → View Update → User|Tech",
  "OAuth 2.0|Request → Auth Server → Login → Auth Code → Token Exchange → Resource|Tech",
  "CAP Theorem|Consistency ↔ Availability ↔ Partition Tolerance (Pick 2)|Tech",
  "DIKW Pyramid|Data → Information → Knowledge → Wisdom|Data",
  "5 M's|Problem → Man? → Machine? → Material? → Method? → Management?|Risk",
  "Bow Tie Analysis|Fault Tree (Cause) → Event (Knot) → Event Tree (Consequence)|Risk",
  "FMEA|Component → Failure Mode → Severity? → Occurrence? → Detection? → RPN Score|Risk",
  "O-Ring Theory|Component A (1.0) × Component B (0.9) × Component C (0.9) = System (0.81)|Risk",
  "Kano Model|Basic Needs (Must) → Performance (Linear) → Delighters (Wow)|Strategy",
  "Value Stream Mapping|Current State → Identify Waste → Future State → Plan|Strategy",
  "Theory of Change|Long-term Goal → Preconditions → Interventions → Indicators|Strategy",
  "Cone of Uncertainty|Today → Drivers → Future A / Future B / Future C → Strategies|Strategy",
  "Blue/Red Teaming|Blue Team (Defend) ↔ Red Team (Attack) → Feedback Loop|Strategy"
];

export function parseData(rawData: string[], type: string) {
  return rawData.map((item, index) => {
    const [title, description, category] = item.split('|');
    return { id: `${type}-${index}`, title, description, category: category || 'Uncategorized', type };
  });
}
