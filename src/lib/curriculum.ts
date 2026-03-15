import type { CurriculumWeek } from './types'

// Source of truth: matches clawnagers-curriculum repo
export const curriculum: CurriculumWeek[] = [
  {
    week: 1,
    title: 'Meet Your Agent',
    description: 'Introduction to AI agents — what they are, how they differ from chatbots, and how they work. Students meet existing agents and brainstorm ideas for their own.',
    objectives: [
      'Define what an AI agent is vs. a chatbot',
      'Identify 5 real-world AI agents',
      'Brainstorm agent ideas for their project',
    ],
    activities: [
      'Agent Safari: Find and test 5 AI agents',
      'Group discussion: "What problems could agents solve at our school?"',
      'Journal entry: My agent idea',
    ],
  },
  {
    week: 2,
    title: 'Skills and Tools',
    description: 'Agents need skills. Learn how agents connect to the outside world through APIs, web search, and data sources. Build your first agent with a real tool.',
    objectives: [
      'Understand what an API is and how agents use tools',
      'Make a basic API call',
      'Define which tools and skills their agent needs',
    ],
    activities: [
      'API Scavenger Hunt: Find free APIs for your agent',
      'Build a weather agent with a real API',
      'Design doc: My agent\'s toolbox',
    ],
  },
  {
    week: 3,
    title: 'Security and Trust',
    description: 'AI safety isn\'t optional. Learn about API key management, prompt injection, permissions, and building responsible AI agents students can trust.',
    objectives: [
      'Understand API key security and secret management',
      'Learn about prompt injection attacks and defenses',
      'Implement basic permissions and guardrails',
    ],
    activities: [
      'Red Team Challenge: Try to break each other\'s agents',
      'Security audit worksheet',
      'Lab: Add guardrails to your agent',
    ],
  },
  {
    week: 4,
    title: 'Memory and Context',
    description: 'How do agents remember? Explore conversation history, persistence, identity, and giving agents the ability to learn from past interactions.',
    objectives: [
      'Understand conversation context windows',
      'Implement basic memory for their agent',
      'Design an agent identity and personality',
    ],
    activities: [
      'Memory Challenge: Can your agent remember a 10-turn conversation?',
      'Build your agent\'s personality card',
      'Group discussion: Privacy implications of agent memory',
    ],
  },
  {
    week: 5,
    title: 'Real-World Connections',
    description: 'Connect agents to messaging channels and the real world. Learn about proactive behavior, notifications, and making agents that actually help people.',
    objectives: [
      'Connect an agent to a messaging channel',
      'Implement proactive agent behavior',
      'Design agent-human interaction patterns',
    ],
    activities: [
      'Channel Setup: Connect your agent to Discord or Slack',
      'Build a proactive notification feature',
      'User testing: Get feedback from classmates',
    ],
  },
  {
    week: 6,
    title: 'Ideation and Design',
    description: 'YC-style ideation week. Find a real problem worth solving, interview potential users, and design your Demo Day agent using the Agent Design Canvas.',
    objectives: [
      'Identify a real problem through user interviews',
      'Complete the Agent Design Canvas',
      'Define MVP scope for Demo Day',
    ],
    activities: [
      'Problem Discovery: Interview 3 potential users',
      'Agent Design Canvas workshop',
      'Pitch your idea in 60 seconds',
    ],
  },
  {
    week: 7,
    title: 'Build Sprint',
    description: 'Build week. Ship something real. Take your design from Week 6 and turn it into a working prototype. Pair programming, daily standups, and rapid iteration.',
    objectives: [
      'Build a working agent prototype',
      'Practice iterative development (build → test → improve)',
      'Prepare a demo-ready version',
    ],
    activities: [
      'Build sprint: Agent v1.0',
      'Daily standups and pair programming',
      'Demo & feedback circle',
    ],
  },
  {
    week: 8,
    title: 'Demo Day Prep',
    description: 'The final stretch. Polish your agent, practice your pitch, and prepare for Demo Day. Top 3 agents win prizes and compete regionally.',
    objectives: [
      'Polish agent UX and reliability',
      'Write and practice a compelling 3-minute pitch',
      'Handle Q&A from judges',
    ],
    activities: [
      'Agent polish sprint',
      'Pitch writing workshop',
      'Practice presentations with feedback',
      'Demo Day: Presentations, judging, and awards',
    ],
  },
]
