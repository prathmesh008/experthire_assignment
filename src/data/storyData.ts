// Story Data - 4 Powerful Stories for International Women's Day
// Fatima (Afghanistan), Rose (1919 USA), Priya (Bangalore), Maria (Mexico)

import { StoryData } from '@/types/story';

// ====================================================
// STORY 1: FATIMA - Right to Education (Afghanistan)
// ====================================================
export const fatimaStory: StoryData = {
  id: 'fatima',
  title: "Fatima's Dream",
  description: 'A 14-year-old in Kabul dreams of becoming a doctor, but girls are banned from secondary school.',
  lottieUrl: '/animations/story.json',
  startNodeId: 'scene1',
  nodes: {
    'scene1': {
      id: 'scene1',
      speaker: 'Narrator',
      text: "The sun rises over Kabul. Your brother Ahmed, 12, puts on his school uniform. You watch him pack his books - the same books you used to carry. Since the ban, your classroom seat sits empty. Your mother calls from the kitchen.",
      mood: 'somber',
      choices: [
        {
          id: 'a',
          label: 'Help mother with housework silently',
          nextNodeId: 'scene2a',
        },
        {
          id: 'b',
          label: 'Ask Ahmed to bring his notes home',
          nextNodeId: 'scene2b',
        },
        {
          id: 'c',
          label: 'Sneak your old textbook under your dress',
          nextNodeId: 'scene2c',
        }
      ]
    },
    'scene2a': {
      id: 'scene2a',
      speaker: 'Narrator',
      text: "You've finished the housework. Your hands are rough from washing clothes. Through the window, you see girls your age walking to the underground school run by brave teachers. Your mother notices you watching.",
      mood: 'somber',
      choices: [
        {
          id: 'a',
          label: 'Look away and continue chores',
          nextNodeId: 'ending_safe',
        },
        {
          id: 'b',
          label: 'Ask mother about the underground school',
          nextNodeId: 'scene3_school',
        }
      ]
    },
    'scene2b': {
      id: 'scene2b',
      speaker: 'Narrator',
      text: "Ahmed returns with his notebook. He's copied today's math lesson for you. You study together in your room, voices hushed. Father comes home early. Footsteps approach your door.",
      mood: 'tense',
      choices: [
        {
          id: 'a',
          label: 'Quickly hide the notebook',
          nextNodeId: 'scene3_secret',
        },
        {
          id: 'b',
          label: 'Keep studying, let him see',
          nextNodeId: 'scene3_father',
        }
      ]
    },
    'scene2c': {
      id: 'scene2c',
      speaker: 'Narrator',
      text: "You've been reading your biology textbook in the storage room. The diagram of the human heart reminds you why you want to be a doctor. Your neighbor Zahra appears at the door. She looks scared but excited.",
      mood: 'hopeful',
      choices: [
        {
          id: 'a',
          label: '"What is it, Zahra?"',
          nextNodeId: 'scene3_school',
        },
        {
          id: 'b',
          label: 'Invite her to study with you',
          nextNodeId: 'scene3_friends',
        }
      ]
    },
    'scene3_school': {
      id: 'scene3_school',
      speaker: 'Mrs. Ahmadi',
      text: "You walk through narrow alleys, heart pounding. The school is in a basement. Fifteen girls sit in rows. The teacher was a university professor. \"Welcome,\" she says. \"Today, we learn that no one can imprison a mind.\"",
      mood: 'hopeful',
      choices: [
        {
          id: 'a',
          label: 'Take your seat and absorb everything',
          nextNodeId: 'ending_education',
        }
      ]
    },
    'scene3_secret': {
      id: 'scene3_secret',
      speaker: 'Narrator',
      text: "The house is quiet. You retrieve the notebook and study by moonlight. You solve three equations. Small victories in a world that wants you silent.",
      mood: 'hopeful',
      choices: [
        {
          id: 'a',
          label: 'Write your dreams in a hidden diary',
          nextNodeId: 'ending_hope',
        }
      ]
    },
    'scene3_father': {
      id: 'scene3_father',
      speaker: 'Father',
      text: "Father sees the notebook. His face is unreadable. Then... he sits down. \"Show me what you learned.\" His eyes are wet. \"Your grandfather fought for girls' schools,\" he says. \"I won't let that die.\"",
      mood: 'triumphant',
      choices: [
        {
          id: 'a',
          label: 'Embrace him',
          nextNodeId: 'ending_family',
        }
      ]
    },
    'scene3_friends': {
      id: 'scene3_friends',
      speaker: 'Zahra',
      text: "Word spreads quietly. Soon, five girls meet in your storage room each afternoon. You take turns teaching what you remember. \"Fatima's Secret School,\" Zahra calls it.",
      mood: 'hopeful',
      choices: [
        {
          id: 'a',
          label: 'Continue teaching',
          nextNodeId: 'ending_leader',
        }
      ]
    },
    'ending_safe': {
      id: 'ending_safe',
      speaker: 'Narrator',
      text: "You survived. You are safe. But the dreams of becoming a doctor fade with each passing year. When your daughter is born, you vow: her life will be different.",
      mood: 'somber',
      isEnding: true,
      endingType: 'safe',
      statistic: "In 2023, over 1.1 million Afghan girls were banned from secondary education.",
    },
    'ending_education': {
      id: 'ending_education',
      speaker: 'Narrator',
      text: "You attend the underground school for two years. When borders open slightly, you escape to Pakistan to continue studies. In 2030, you return as Dr. Fatima - the first doctor in your family.",
      mood: 'triumphant',
      isEnding: true,
      endingType: 'defiance',
      statistic: "Underground schools in Afghanistan have educated over 5,000 girls despite the ban.",
    },
    'ending_hope': {
      id: 'ending_hope',
      speaker: 'Narrator',
      text: "Your diary becomes a book. Published anonymously, it tells the world about Afghan girls' struggle. You never become a doctor, but your words inspire millions.",
      mood: 'hopeful',
      isEnding: true,
      endingType: 'hope',
      statistic: "Malala Yousafzai's diary changed the world's understanding of girls' education struggles.",
    },
    'ending_family': {
      id: 'ending_family',
      speaker: 'Narrator',
      text: "With father's support, you study through online programs smuggled via VPN. It's slow, dangerous, but steady. When change finally comes, you're ready.",
      mood: 'triumphant',
      isEnding: true,
      endingType: 'family',
      statistic: "Family support transforms possibilities. Parents who champion daughters' education create ripples across generations.",
    },
    'ending_leader': {
      id: 'ending_leader',
      speaker: 'Narrator',
      text: "Your storage room school grows. You develop a network of girl-teachers across the neighborhood. You become the light that others follow.",
      mood: 'triumphant',
      isEnding: true,
      endingType: 'leader',
      statistic: "When systems fail, communities rise. Grassroots education movements have changed history.",
    }
  }
};

// ====================================================
// STORY 2: ROSE - Right to Vote (1919 New York)
// ====================================================
export const roseStory: StoryData = {
  id: 'rose',
  title: "Rose's March",
  description: 'A factory worker and suffragette fighting for women\'s right to vote, one year before the 19th Amendment.',
  lottieUrl: '/animations/story.json',
  startNodeId: 'scene1',
  nodes: {
    'scene1': {
      id: 'scene1',
      speaker: 'Narrator',
      text: "The factory whistle blows. Your fingers are raw from sewing. You make $6 a week; men doing the same work make $15. Today, the suffragettes are marching to City Hall. You have a choice.",
      mood: 'tense',
      choices: [
        {
          id: 'a',
          label: "Go to work - you can't afford to lose the job",
          nextNodeId: 'scene2_work',
        },
        {
          id: 'b',
          label: "Join the march - history won't wait",
          nextNodeId: 'scene2_march',
        },
        {
          id: 'c',
          label: 'Secretly distribute pamphlets at the factory',
          nextNodeId: 'scene2_pamphlets',
        }
      ]
    },
    'scene2_work': {
      id: 'scene2_work',
      speaker: 'Narrator',
      text: "Through the grimy window, you see women in white marching. Police with batons. Your coworker Mary whispers, 'My sister is out there.' The foreman approaches.",
      mood: 'tense',
      choices: [
        {
          id: 'a',
          label: 'Keep working, eyes down',
          nextNodeId: 'ending_regret',
        },
        {
          id: 'b',
          label: '"I\'m feeling ill" - leave to join the march',
          nextNodeId: 'scene3_latejoin',
        }
      ]
    },
    'scene2_march': {
      id: 'scene2_march',
      speaker: 'Narrator',
      text: "Thousands of women in white fill Fifth Avenue. You carry a sign: 'VOTES FOR WOMEN.' Men jeer from sidewalks. Police form a line ahead. The leader calls for you to stand firm.",
      mood: 'hopeful',
      choices: [
        {
          id: 'a',
          label: 'Link arms with other women and advance',
          nextNodeId: 'scene3_victory',
        },
        {
          id: 'b',
          label: 'Step to the front with a megaphone',
          nextNodeId: 'scene3_leader',
        }
      ]
    },
    'scene2_pamphlets': {
      id: 'scene2_pamphlets',
      speaker: 'Narrator',
      text: "After work, you meet with fellow suffragettes in a basement. Plans are made for a night raid - pasting posters across the city. It's illegal. You could be arrested.",
      mood: 'tense',
      choices: [
        {
          id: 'a',
          label: 'Volunteer for the night raid',
          nextNodeId: 'ending_underground',
        },
        {
          id: 'b',
          label: 'Offer to write articles for the newsletter',
          nextNodeId: 'ending_writer',
        }
      ]
    },
    'scene3_latejoin': {
      id: 'scene3_latejoin',
      speaker: 'Narrator',
      text: "You arrive as police are arresting women. Your friend Clara is dragged into a wagon. An officer turns to you.",
      mood: 'tense',
      choices: [
        {
          id: 'a',
          label: 'Stand with Clara - get arrested together',
          nextNodeId: 'ending_prison',
        }
      ]
    },
    'scene3_victory': {
      id: 'scene3_victory',
      speaker: 'Narrator',
      text: "You reach City Hall. The mayor refuses to meet you, but reporters are everywhere. A journalist asks for your story.",
      mood: 'hopeful',
      choices: [
        {
          id: 'a',
          label: 'Tell him everything - the factory, the unfair wages, the dream of equality',
          nextNodeId: 'ending_voice',
        }
      ]
    },
    'scene3_leader': {
      id: 'scene3_leader',
      speaker: 'Narrator',
      text: "Your photograph is in every newspaper. You receive letters - some hateful, most supportive. The movement asks you to speak at rallies.",
      mood: 'triumphant',
      choices: [
        {
          id: 'a',
          label: 'Accept - become a voice for working women',
          nextNodeId: 'ending_icon',
        }
      ]
    },
    'ending_regret': {
      id: 'ending_regret',
      speaker: 'Narrator',
      text: "The 19th Amendment passes in 1920. You vote for the first time. But you always wonder: what if you had marched? What if your voice had joined the chorus?",
      mood: 'somber',
      isEnding: true,
      endingType: 'regret',
      statistic: "The right to vote was won by those who marched AND those who survived to use it.",
    },
    'ending_underground': {
      id: 'ending_underground',
      speaker: 'Narrator',
      text: "You're arrested three times. Each time, you return. When the Amendment passes, your poster from 1919 hangs in a museum. You smile every time you pass it.",
      mood: 'triumphant',
      isEnding: true,
      endingType: 'underground',
      statistic: "The Night of Terror in 1917 saw 33 suffragettes brutally imprisoned - their sacrifice turned public opinion.",
    },
    'ending_writer': {
      id: 'ending_writer',
      speaker: 'Narrator',
      text: "Your articles reach thousands. You become an editor, then a publisher. The first newspaper you launch is staffed entirely by women.",
      mood: 'triumphant',
      isEnding: true,
      endingType: 'writer',
      statistic: "Women journalists like Ida B. Wells and Nellie Bly used writing as activism, reaching audiences that marches couldn't.",
    },
    'ending_prison': {
      id: 'ending_prison',
      speaker: 'Narrator',
      text: "You spend 30 days in jail. The conditions are brutal. But the publicity helps the cause. President Wilson finally supports the Amendment.",
      mood: 'hopeful',
      isEnding: true,
      endingType: 'prison',
      statistic: "The imprisonment of suffragettes was a turning point. Their treatment shocked America.",
    },
    'ending_voice': {
      id: 'ending_voice',
      speaker: 'Narrator',
      text: "Your interview is read by millions. Factory workers across America begin to organize. You help found one of the first women's labor unions.",
      mood: 'triumphant',
      isEnding: true,
      endingType: 'voice',
      statistic: "Women's suffrage and labor rights were deeply connected. Many suffragettes also fought for fair wages.",
    },
    'ending_icon': {
      id: 'ending_icon',
      speaker: 'Narrator',
      text: "History remembers you. In 2020, your great-granddaughter casts her vote, 100 years after you cast yours. The cycle of freedom continues.",
      mood: 'triumphant',
      isEnding: true,
      endingType: 'icon',
      statistic: "The 19th Amendment was ratified on August 18, 1920. It took 72 years of fighting.",
    }
  }
};

// ====================================================
// STORY 3: PRIYA - Workplace Equality (Bangalore)
// ====================================================
export const priyaStory: StoryData = {
  id: 'priya',
  title: "Priya's Stand",
  description: 'A talented software engineer passed over for promotion while less qualified male colleagues advance.',
  lottieUrl: '/animations/story.json',
  startNodeId: 'scene1',
  nodes: {
    'scene1': {
      id: 'scene1',
      speaker: 'Narrator',
      text: "You've led the team for 18 months. Delivered every project early. Today, promotions are announced. Rahul, who joined after you and whose code you debug, is promoted to Senior Engineer. You are not. Your manager calls you to his office.",
      mood: 'tense',
      choices: [
        {
          id: 'a',
          label: "Accept it quietly - there's always next cycle",
          nextNodeId: 'scene2_quiet',
        },
        {
          id: 'b',
          label: 'Ask directly: "Can you explain the decision?"',
          nextNodeId: 'scene2_confront',
        },
        {
          id: 'c',
          label: 'Request a meeting with HR to document everything',
          nextNodeId: 'scene2_hr',
        }
      ]
    },
    'scene2_quiet': {
      id: 'scene2_quiet',
      speaker: 'Narrator',
      text: "You return to your desk. The code blurs through tears you won't shed. Your friend Meera messages: \"This is wrong. Everyone knows it.\" LinkedIn notification: a recruiter from a top startup.",
      mood: 'somber',
      choices: [
        {
          id: 'a',
          label: 'Ignore it - stay loyal to the company',
          nextNodeId: 'ending_stay',
        },
        {
          id: 'b',
          label: 'Reply to the recruiter',
          nextNodeId: 'scene3_opportunity',
        }
      ]
    },
    'scene2_confront': {
      id: 'scene2_confront',
      speaker: 'Manager',
      text: "\"Rahul has better leadership presence,\" your manager says. You have led three teams. Rahul led zero. You have data: your commits, your reviews, your impact metrics. You have evidence.",
      mood: 'tense',
      choices: [
        {
          id: 'a',
          label: 'Present the data calmly and professionally',
          nextNodeId: 'scene3_data',
        },
        {
          id: 'b',
          label: '"I\'d like this reviewed by the skip-level manager"',
          nextNodeId: 'scene3_escalate',
        }
      ]
    },
    'scene2_hr': {
      id: 'scene2_hr',
      speaker: 'HR Manager',
      text: "The HR manager listens carefully. You show her the promotion criteria and how you exceed every metric. She nods, types notes, and says, \"This will be reviewed.\" Is it a promise or a brush-off?",
      mood: 'neutral',
      choices: [
        {
          id: 'a',
          label: 'Trust the process',
          nextNodeId: 'scene3_process',
        },
        {
          id: 'b',
          label: 'Ask for written follow-up and deadlines',
          nextNodeId: 'scene3_documentation',
        }
      ]
    },
    'scene3_opportunity': {
      id: 'scene3_opportunity',
      speaker: 'CEO',
      text: "The startup's CEO is a woman. She asks about your experience. You tell the truth. She offers you not just a job, but a leadership role building their engineering culture.",
      mood: 'hopeful',
      choices: [
        {
          id: 'a',
          label: 'Accept the offer',
          nextNodeId: 'ending_newpath',
        }
      ]
    },
    'scene3_data': {
      id: 'scene3_data',
      speaker: 'Narrator',
      text: "Your data is irrefutable. 47 deployments vs Rahul's 12. 98% code review approval vs 71%. Your manager sighs. \"Let me talk to the leadership team.\"",
      mood: 'hopeful',
      choices: [
        {
          id: 'a',
          label: 'Wait for the outcome',
          nextNodeId: 'ending_promotion',
        }
      ]
    },
    'scene3_escalate': {
      id: 'scene3_escalate',
      speaker: 'VP',
      text: "The VP listens. She's experienced this herself. \"Thank you for speaking up,\" she says. \"This isn't just about you - this is about fixing the system.\"",
      mood: 'hopeful',
      choices: [
        {
          id: 'a',
          label: 'Offer to help create better evaluation criteria',
          nextNodeId: 'ending_changemaker',
        }
      ]
    },
    'scene3_process': {
      id: 'scene3_process',
      speaker: 'Narrator',
      text: "HR calls two weeks later. An \"error\" was found in the evaluation process. Your promotion is approved with back-pay. Rahul's promotion stands too.",
      mood: 'neutral',
      choices: [
        {
          id: 'a',
          label: 'Accept graciously',
          nextNodeId: 'ending_system',
        }
      ]
    },
    'scene3_documentation': {
      id: 'scene3_documentation',
      speaker: 'Narrator',
      text: "Armed with documentation, you present a pattern: you and three other women were evaluated differently than male peers. HR escalates to Legal. The company announces a review of all promotions.",
      mood: 'hopeful',
      choices: [
        {
          id: 'a',
          label: 'See it through',
          nextNodeId: 'ending_advocate',
        }
      ]
    },
    'ending_stay': {
      id: 'ending_stay',
      speaker: 'Narrator',
      text: "You stay for three more years. Two more promotions pass you by. When you finally leave, you realize: loyalty should be mutual.",
      mood: 'somber',
      isEnding: true,
      endingType: 'loyalty',
      statistic: "Women wait 30% longer than men for promotions on average.",
    },
    'ending_newpath': {
      id: 'ending_newpath',
      speaker: 'Narrator',
      text: "Your new company thrives. You promote based on merit, blind reviews, clear criteria. Your old manager? He reaches out for advice two years later.",
      mood: 'triumphant',
      isEnding: true,
      endingType: 'newpath',
      statistic: "Women founders and leaders are building new companies with equity at the core.",
    },
    'ending_promotion': {
      id: 'ending_promotion',
      speaker: 'Narrator',
      text: "You got your promotion. But you start mentoring junior women engineers, teaching them to document everything. No one will have to fight as hard as you did.",
      mood: 'hopeful',
      isEnding: true,
      endingType: 'promotion',
      statistic: "Companies with objective promotion criteria see 25% more women in leadership.",
    },
    'ending_changemaker': {
      id: 'ending_changemaker',
      speaker: 'Narrator',
      text: "You lead the company's first Equity Task Force. Three years later, the company is recognized as a top workplace for women. Your courage created a legacy.",
      mood: 'triumphant',
      isEnding: true,
      endingType: 'changemaker',
      statistic: "One person speaking up often opens the door for hundreds.",
    },
    'ending_system': {
      id: 'ending_system',
      speaker: 'Narrator',
      text: "You got justice. But you wonder about those who didn't fight. You start an anonymous platform for women to share their workplace experiences.",
      mood: 'hopeful',
      isEnding: true,
      endingType: 'system',
      statistic: "Platforms like Glassdoor empower collective action.",
    },
    'ending_advocate': {
      id: 'ending_advocate',
      speaker: 'Narrator',
      text: "Your documentation changes company policy. You're invited to speak at conferences. One person's paper trail became a movement.",
      mood: 'triumphant',
      isEnding: true,
      endingType: 'advocate',
      statistic: "Documentation is power. Legal cases for equal pay, like Lilly Ledbetter's, changed laws and protected millions.",
    }
  }
};

// ====================================================
// STORY 4: MARIA - Single Mother Resilience (Mexico)
// ====================================================
export const mariaStory: StoryData = {
  id: 'maria',
  title: "Maria's Journey",
  description: 'A single mother of two, working three jobs while pursuing a nursing degree at night school.',
  lottieUrl: '/animations/story.json',
  startNodeId: 'scene1',
  nodes: {
    'scene1': {
      id: 'scene1',
      speaker: 'Narrator',
      text: "The alarm rings. You've slept four hours. Your children, Sofia (8) and Diego (5), won't wake for two more hours. You have cleaning jobs at two houses before your hospital shift at noon. Your nursing exam is tomorrow. You haven't studied.",
      mood: 'tense',
      choices: [
        {
          id: 'a',
          label: 'Study now - the exam matters most',
          nextNodeId: 'scene2_study',
        },
        {
          id: 'b',
          label: "Go to the cleaning job - you need this month's rent",
          nextNodeId: 'scene2_work',
        },
        {
          id: 'c',
          label: 'Prepare breakfast and lunch for the kids first',
          nextNodeId: 'scene2_mom',
        }
      ]
    },
    'scene2_study': {
      id: 'scene2_study',
      speaker: 'Narrator',
      text: "You quiz yourself on medication dosages. Your phone buzzes - the cleaning client is angry. You haven't confirmed. You could lose the job. But the words on the page are making sense. Finally.",
      mood: 'tense',
      choices: [
        {
          id: 'a',
          label: 'Keep studying - call the client later',
          nextNodeId: 'scene3_exam',
        },
        {
          id: 'b',
          label: 'Call the client, then study on the bus',
          nextNodeId: 'scene3_balance',
        }
      ]
    },
    'scene2_work': {
      id: 'scene2_work',
      speaker: 'Narrator',
      text: "Mrs. Gutierrez barely acknowledges you. Her house has six bathrooms. Your knees ache from scrubbing. But she pays cash, same day. In your pocket, you carry flashcards. Between rooms, you quiz yourself.",
      mood: 'neutral',
      choices: [
        {
          id: 'a',
          label: 'Focus on work - do it perfectly',
          nextNodeId: 'scene3_tip',
        },
        {
          id: 'b',
          label: 'Ask Mrs. Gutierrez if she knows any nurses - network',
          nextNodeId: 'scene3_network',
        }
      ]
    },
    'scene2_mom': {
      id: 'scene2_mom',
      speaker: 'Sofia',
      text: "Sofia wakes up. \"Mama, will you be home for dinner?\" You calculate: cleaning, hospital, night class. No. But you can leave a note, maybe a small treat. Diego stumbles in, holding his teddy bear.",
      mood: 'hopeful',
      choices: [
        {
          id: 'a',
          label: 'Promise a special weekend together',
          nextNodeId: 'scene3_promise',
        },
        {
          id: 'b',
          label: 'Video call them from your break',
          nextNodeId: 'scene3_connected',
        }
      ]
    },
    'scene3_exam': {
      id: 'scene3_exam',
      speaker: 'Narrator',
      text: "You finished your shift. Your feet are swollen. The exam is in one hour. You haven't slept in 36 hours. But you know the material. You feel it.",
      mood: 'hopeful',
      choices: [
        {
          id: 'a',
          label: 'Take the exam',
          nextNodeId: 'ending_pass',
        }
      ]
    },
    'scene3_balance': {
      id: 'scene3_balance',
      speaker: 'Stranger',
      text: "You study on the bus, flashcards in hand. A woman sits next to you. She notices. \"Nursing school?\" She's a nurse. She offers study tips and her phone number.",
      mood: 'hopeful',
      choices: [
        {
          id: 'a',
          label: 'Exchange numbers gratefully',
          nextNodeId: 'ending_mentor',
        }
      ]
    },
    'scene3_tip': {
      id: 'scene3_tip',
      speaker: 'Narrator',
      text: "With the tip, you have enough for both rent AND Sofia's school supplies. You sit in the car and cry. Then you drive to the hospital for your shift.",
      mood: 'hopeful',
      choices: [
        {
          id: 'a',
          label: 'Keep pushing forward',
          nextNodeId: 'ending_resilience',
        }
      ]
    },
    'scene3_network': {
      id: 'scene3_network',
      speaker: 'Narrator',
      text: "Mrs. Gutierrez's sister calls you that afternoon. There's a nursing assistant position at her hospital - better hours, benefits, tuition assistance. It's not a cleaning job, it's a career step.",
      mood: 'hopeful',
      choices: [
        {
          id: 'a',
          label: 'Take the interview',
          nextNodeId: 'ending_opportunity',
        }
      ]
    },
    'scene3_promise': {
      id: 'scene3_promise',
      speaker: 'Narrator',
      text: "You kept your promise. The park, ice cream, no phone. Sofia shows you her drawings. Diego collects rocks. For a few hours, you're not tired. You're just mama.",
      mood: 'triumphant',
      choices: [
        {
          id: 'a',
          label: 'Hold them close',
          nextNodeId: 'ending_family',
        }
      ]
    },
    'scene3_connected': {
      id: 'scene3_connected',
      speaker: 'Narrator',
      text: "Sofia shows you her art project. Diego makes silly faces. The nurses see you smiling at your phone. One asks, \"Your kids?\" You show them. They become family too.",
      mood: 'hopeful',
      choices: [
        {
          id: 'a',
          label: 'Introduce your work family to your real family',
          nextNodeId: 'ending_community',
        }
      ]
    },
    'ending_pass': {
      id: 'ending_pass',
      speaker: 'Narrator',
      text: "Two years later, you graduate. Sofia and Diego sit in the front row. You're hired as an RN at the same hospital where you mopped floors. Your children learn: dreams don't have deadlines.",
      mood: 'triumphant',
      isEnding: true,
      endingType: 'degree',
      statistic: "Single mothers earn degrees at lower rates due to systemic barriers, not ability. Every graduation is a victory.",
    },
    'ending_mentor': {
      id: 'ending_mentor',
      speaker: 'Narrator',
      text: "Your bus friend becomes your study partner, then your colleague. Years later, you ride the same bus route - as nurses, together. You never know who's watching your struggle and rooting for you.",
      mood: 'triumphant',
      isEnding: true,
      endingType: 'mentor',
      statistic: "75% of executives credit mentors for their success. For single mothers, mentors provide crucial guidance.",
    },
    'ending_resilience': {
      id: 'ending_resilience',
      speaker: 'Narrator',
      text: "It takes three years instead of two. But you finish. Your children write essays about you for school: \"My mama is a hero.\" They're right.",
      mood: 'triumphant',
      isEnding: true,
      endingType: 'resilience',
      statistic: "Resilience isn't pretty. It's exhaustion and doubt and pushing through anyway.",
    },
    'ending_opportunity': {
      id: 'ending_opportunity',
      speaker: 'Narrator',
      text: "The nursing assistant job leads to tuition reimbursement. You finish your degree debt-free. You create a scholarship for single mothers at your nursing school.",
      mood: 'triumphant',
      isEnding: true,
      endingType: 'opportunity',
      statistic: "One opportunity changes trajectories. Organizations supporting working mothers create generational change.",
    },
    'ending_family': {
      id: 'ending_family',
      speaker: 'Narrator',
      text: "You become a pediatric nurse. Sofia becomes a doctor. Diego becomes a teacher. The cycle of struggle breaks. Love, amplified across time.",
      mood: 'triumphant',
      isEnding: true,
      endingType: 'family',
      statistic: "Children of single mothers who pursue education see their own possibilities expand.",
    },
    'ending_community': {
      id: 'ending_community',
      speaker: 'Narrator',
      text: "Your hospital coworkers become aunties and uncles to your kids. Someone always picks them up when you can't. Community is the secret ingredient no one tells single parents about.",
      mood: 'triumphant',
      isEnding: true,
      endingType: 'community',
      statistic: "It takes a village. Single parents who build support networks have better outcomes for themselves and their children.",
    }
  }
};

// All stories map for easy access
export const allStories: Record<string, StoryData> = {
  'fatima': fatimaStory,
  'rose': roseStory,
  'priya': priyaStory,
  'maria': mariaStory,
};

// Default export for backward compatibility
export const breakingThroughStory = priyaStory;
