// ===== MOCK DATA FOR MyLZ GUARDIAN PROTOTYPE =====

const SMART_ACTIONS = {
  now: [
    {
      title: "File your California Annual Report",
      risk: "Avoid a <strong>$250 penalty</strong> and loss of Good Standing by completing this before April 15.",
      why: "California requires all LLCs to file annually. Missing this deadline triggers a $250 penalty and may lead to administrative dissolution.",
      ignore: "If ignored: $250 penalty + potential suspension of your LLC by the CA Secretary of State.",
      delegates: ["diy", "difm", "concierge"],
      triggersModal: true
    },
    {
      title: "Pay Delaware Franchise Tax — Overdue",
      risk: "This is <strong>past due</strong>. You're accruing $200/month in penalties.",
      why: "Delaware requires annual franchise tax for all corporations. Failure to pay results in penalties and potential forfeiture of your charter.",
      ignore: "If ignored: Accumulating $200/month penalties. After 3 years, Delaware will void your corporation's charter.",
      delegates: ["diy", "difm"]
    }
  ],
  soon: [
    {
      title: "Review contractor classification for J. Smith",
      risk: "Misclassification penalties can reach <strong>$25,000 per worker</strong> in California.",
      why: "You added a contractor in February. California has strict AB5 rules — if this worker is misclassified, you face significant fines.",
      ignore: "If ignored: Risk of audit, back taxes, and penalties if the EDD reclassifies this worker as an employee.",
      delegates: ["diy", "bap"]
    },
    {
      title: "Update your Operating Agreement",
      risk: "Your Operating Agreement hasn't been updated since formation (Jan 2024). Some provisions may be outdated.",
      why: "Operating Agreements should be reviewed annually, especially if you've added members, changed addresses, or adjusted profit splits.",
      ignore: "If ignored: Outdated terms could create liability in disputes or member disagreements.",
      delegates: ["diy", "bap"]
    },
    {
      title: "Set up state unemployment insurance",
      risk: "With 3 employees in California, you <strong>may be required</strong> to register for SUI.",
      why: "California requires employers with 1+ employees to register with EDD for unemployment insurance.",
      ignore: "If ignored: Penalties of up to $100/day for late registration.",
      delegates: ["diy", "concierge", "bap"]
    }
  ],
  watchlist: [
    {
      title: "Business license renewal — September 2026",
      risk: "Your city business license expires in September. We'll remind you 60 days ahead.",
      why: "Most jurisdictions require annual business license renewal. LegalZoom monitors this for you.",
      ignore: "If ignored: Operating without a valid license can result in fines.",
      delegates: ["diy"]
    },
    {
      title: "Consider trademark registration",
      risk: "Your business name 'Hatfield Consulting' is not trademark protected. A competitor could use a similar name.",
      why: "Trademark registration gives you nationwide priority and legal protection for your business name.",
      ignore: "If ignored: No immediate risk, but you have limited legal recourse if another business uses a confusingly similar name.",
      delegates: ["diy", "difm", "bap"]
    }
  ]
};

const RISK_DOMAINS = [
  {
    title: "Entity Compliance",
    icon: "&#128203;",
    status: "at-risk",
    statusLabel: "At Risk",
    items: [
      { label: "CA Annual Report — Due Apr 15", color: "yellow" },
      { label: "DE Franchise Tax — Overdue", color: "red" },
      { label: "Registered Agent — Active", color: "green" },
      { label: "Statement of Information — Filed", color: "green" }
    ],
    lastChecked: "2 hours ago"
  },
  {
    title: "Employer Compliance",
    icon: "&#128101;",
    status: "at-risk",
    statusLabel: "At Risk",
    items: [
      { label: "Contractor classification — Needs review", color: "yellow" },
      { label: "State unemployment insurance — Not registered", color: "yellow" },
      { label: "Workers comp — Active", color: "green" }
    ],
    lastChecked: "1 day ago"
  },
  {
    title: "Financial Health",
    icon: "&#128176;",
    status: "good",
    statusLabel: "Good Standing",
    items: [
      { label: "Business bank account — Active", color: "green" },
      { label: "Business credit score — 72/100", color: "green" },
      { label: "Q1 estimated taxes — Filed", color: "green" }
    ],
    lastChecked: "3 days ago"
  },
  {
    title: "Growth & Strategic",
    icon: "&#128200;",
    status: "good",
    statusLabel: "Good Standing",
    items: [
      { label: "Business insurance — Active", color: "green" },
      { label: "Trademark — Not registered", color: "yellow" },
      { label: "Business license — Valid until Sep 2026", color: "green" }
    ],
    lastChecked: "1 week ago"
  }
];

const CHECKINS = [
  {
    trigger: "New Hire Detected",
    triggerType: "hire",
    title: "You added an employee last month",
    description: "With 3 employees in California, there are a few things to check on your employer compliance.",
    reco: {
      label: "Recommended",
      text: "Review your contractor classification and set up SUI registration."
    }
  },
  {
    trigger: "Upcoming Deadline",
    triggerType: "deadline",
    title: "Annual Report due in 7 days",
    description: "Your California Annual Report is due April 15. Filing now takes ~5 minutes online or we can do it for you.",
    reco: {
      label: "Time saved if we do it",
      text: "Let LegalZoom handle it — average turnaround 2 business days."
    }
  },
  {
    trigger: "Business Growth Signal",
    triggerType: "growth",
    title: "You might be ready for a trademark",
    description: "Businesses with 2+ years of operation and active revenue often benefit from trademark protection.",
    reco: {
      label: "Why now?",
      text: "Protect your name before a competitor registers something similar."
    }
  }
];

const NOTIFICATIONS = [
  {
    type: "deadlines",
    icon: "&#9888;",
    iconClass: "deadline",
    title: "Annual Report due in 7 days",
    body: "CA Annual Report for Hatfield Consulting LLC is due April 15, 2026.",
    time: "2h ago",
    unread: true
  },
  {
    type: "deadlines",
    icon: "&#128680;",
    iconClass: "deadline",
    title: "Delaware Franchise Tax overdue",
    body: "TH Ventures Inc franchise tax is past due. Penalties accruing at $200/month.",
    time: "1d ago",
    unread: true
  },
  {
    type: "changes",
    icon: "&#128196;",
    iconClass: "change",
    title: "Statement of Information filed",
    body: "Your CA Statement of Information was successfully filed on Mar 1, 2026.",
    time: "5d ago",
    unread: false
  },
  {
    type: "milestones",
    icon: "&#127881;",
    iconClass: "milestone",
    title: "2 years in business!",
    body: "Hatfield Consulting LLC has been active for 2 years. Consider a compliance check-up.",
    time: "1w ago",
    unread: true
  },
  {
    type: "changes",
    icon: "&#128221;",
    iconClass: "change",
    title: "Meeting minutes generated",
    body: "Your Q1 2026 meeting minutes are ready. Review and sign in the Documents center.",
    time: "2w ago",
    unread: true
  },
  {
    type: "milestones",
    icon: "&#128101;",
    iconClass: "milestone",
    title: "3rd employee added",
    body: "You now have 3 employees. Check your employer obligations in the Employees center.",
    time: "3w ago",
    unread: true
  }
];

const LIFECYCLE_EVENTS = [
  { date: "Jan 2024", title: "Business Formed", channel: "Email", status: "past" },
  { date: "Feb 2024", title: "EIN Received", channel: "Email", status: "past" },
  { date: "Mar 2024", title: "RA Activated", channel: "In-app", status: "past" },
  { date: "Jan 2025", title: "1st Annual Report", channel: "Email + SMS", status: "past" },
  { date: "Feb 2026", title: "1st Employee Hired", channel: "In-app", status: "past" },
  { date: "Apr 2026", title: "Annual Report Due", channel: "Email + SMS + In-app", status: "current" },
  { date: "Sep 2026", title: "License Renewal", channel: "Email", status: "future" },
  { date: "Jan 2027", title: "3-Year Check-up", channel: "Email + Call", status: "future" }
];

const AI_RESPONSES = {
  "am i compliant": "Based on your current status, **Hatfield Consulting LLC** has 1 item needing attention: your **California Annual Report** is due April 15. Your registered agent is active and your Statement of Information is filed.\n\n**TH Ventures Inc** has 1 overdue item: **Delaware Franchise Tax**. I'd recommend addressing this immediately to stop penalty accrual.\n\nWould you like me to help you file either of these?",
  "what do i do if i hire": "When hiring in California, here are the key steps:\n\n1. **Verify worker classification** (employee vs. contractor under AB5)\n2. **Register with EDD** for state unemployment insurance\n3. **Set up workers' comp** insurance (required in CA)\n4. **Report new hire** to the CA Employment Development Department within 20 days\n5. **Provide required notices** (wage notice, workplace postings)\n\nYou currently have 3 employees. Would you like me to check if you've completed all these steps?",
  "default": "I can help with questions about your compliance status, next steps for your business, and document lookups. For legal advice, I recommend connecting with a licensed attorney through our Expert panel.\n\nTry asking me things like:\n- \"Am I compliant?\"\n- \"What do I do if I hire?\"\n- \"When is my next filing due?\""
};
