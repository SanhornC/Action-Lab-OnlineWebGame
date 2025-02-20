import { SCENE_NUM, calc_scene_idx_fn } from "../consts.js"
import { Question } from "../../common/state_ser.js"

const SCENE_MIDGAME_QUESTION_LIST = [
  [
    ['Which companies have mature techniques for developing influenza vaccines? (select one answer)', ['ME','NJ','PI','SA']
  ], 
    ['Which companies have similar technologies to AAA, and can AAA increase its scale by acquiring them? (select one answer)', ['ME','NJ','PI','SA']
  ],
    ['Which company has the advantages for research and patent development? (select one answer)', ['ME','NJ','PI','SA']
  ],
    ['With the information you get, which target can generate the best profits for AAA? (select one answer)', ['ME','NJ','PI','SA']
  ],
    ['Which companies will be affected by the US FDA\'s stricter approval rules for vaccine or drug testing? (multiple choices)', ['ME','NJ','PI','SA']
  ],
  ],
  [
    ['Which target will be the best option if AAA plans to enter the cloud computing market? (select one answer)',['X','Y','Z','Not Sure']
  ],
    ['Which target will be the best option if AAA enters the e-commerce market? (select one answer)',['X','Y','Z','Not Sure']
  ],
    ['Which companies will be affected by the rising tax in Europe? (select one answer)',['X','Y','Z','Not Sure']
  ],
    ['With the information you get, which target can generate the best profits for AAA? (select one answer)',['X','Y','Z','Not Sure']
  ],
    ['Which companies might have been affected by the rising transportation fee in the past years? (select one answer)',['X','Y','Z','Not Sure']
  ]
  ],
  [
    ['Which city has better transportation services? (multiple choices)',['Auro','Basa','Cilia','Debu']
  ],
    ['Which city has the most robust ability to raise funds for the game? (multiple choices)',['Auro','Basa','Cilia','Debu']
  ],
    ['Which city or cities have financial issues holding the game? (select one answer)',['Auro','Basa','Cilia','Debu']
  ],
    ['Which city or city residents oppose the game? (select one answer)',['Auro','Basa','Cilia','Debu']
  ],
    ['Which cities do you think are qualified to hold the game? (multiple choices)',['Auro','Basa','Cilia','Debu']
  ],
  ],
  [
    ['Who often argued with the victim and felt the music was noisy? (select one answer)',[
      'The Suspect A',
      'The suspect B',
      'The Suspect C',
      'None of them./Still not clear']
  ],
    ['Who is also a music lover and interested in the phonograph record? (select one answer)',[
      'The Suspect A',
      'The suspect B',
      'The Suspect C',
      'None of them./Still not clear']
  ],
    ['Who has an urgent need for some money? (select one answer)',[
      'The Suspect A',
      'The suspect B',
      'The Suspect C',
      'None of them./Still not clear']
  ],
    ['Who can lift a heavy item by themselves? (select one answer)',[
      'The Suspect A',
      'The suspect B',
      'The Suspect C',
      'None of them./Still not clear']
  ],
    ['Who is able to commit the crime at the described time? (select one answer)',[
      'The Suspect A',
      'The suspect B',
      'The Suspect C',
      'None of them./Still not clear']
  ]
  ],
  [
    ['What is the possible reason that the wife murdered the owner? (select one answer)',[
      'She found the betrayel of the owner',
      'She has an urgent need for money',
      'She would like to inherit the hotel',
      'She was caught to stole money from the hotel']
  ],
    ['What is the possible reason that the brother murdered the owner? (select one answer)',[
      'He would like to inherit the hotel',
      'He is angry about the owner',
      'The owner discovered his secret',
      'He has an urgent need for money']
  ],
    ['Who has a bad relationship with the owner? (select one answer)',[
      'The brother',
      'The counter',
      'The chef',
      'The wife']
  ],
    ['Who has an urgent need for money? (select one answer)',[
      'The brother',
      'The counter',
      'The chef',
      'The wife']
  ],
    ['Who is likely to access the poisoned milk in the kitchen? (select two answers)',[
      'The brother',
      'The counter',
      'The chef',
      'The wife']
  ],
  ],
  [
    ['What is the possible motivation for the servant to murder the lord?',[
      'He wished the son success the lord of the West',
      'He is tired of his work',
      'He had a conflict with the lord and the lord punished him',
      'The lord supports his political enemy']
  ],
    ['What is the possible motivation for the lord to commit suicide?',[
      'His health Issue,His religious belief',
      'He was upset about his son and the officers',
      'He was tired of the conflict between the realms']
  ],
    ['What is the most likely reason for the ambassador to murder the lord?',[
      'He wished the son to succeed the lord of the West',
      'He is always angry with the lord because they fought together when they were young',
      'The conversation with the lord resulted in a bad outcome for the East Realm',
      'The ambassador would like to usurp the lord of the West']
  ],
    ['Who had any chance to add poison when the lord left temporarily during the banquet? (select two answers)',[
      'The son',
      'The servant',
      'The ambassador',
      'The commander']
  ],
    ['Which is the least likely person who gets the poison APX-4870?',['The servant',
      'The son',
      'The ambassador',
      'The lord']
  ]
  ],
  [
    ['Which can best describe how people get affected by the disease X?',[
      'The complication of diabetes',
      'The complication of osteoporosis',
      'Excessive intake of vitamin D',
      'Some gene reasons']
  ],
    ['What kinds of symptoms are the patients with disease X at high risk?',[
      'Impaired hearing',
      'Heart attack',
      'Mad Cow Disease',
      'Alzheimer\'s disease']
  ],
    ['Which is the best method to mitigate the symptoms of disease X?',[
      'Do more exercise to maintain the strength of bones',
      'Reduce smartphone usage to keep your eyesight healthy',
      'Like patients with type 2 diabetes patients with disease X should prevent sugar-weetened beverages',
      'Prevent milk and eggs to reduce the amounts of protein intake']
  ],
    ['Which sentence best describes the characteristics of disease X?',[
      'No matter the form of the protein X it will cause disease X when it accumulates in blood vessels',
      'The patients of disease X are often diagnosed in old age',
      'People can absorb more milk and dairy products to absorb vitamin D to prevent disease X',
      'There have been no methods to cure disease X until now.']
  ],
    ['Which patient is most likely to have the disease X based on their symptoms?',[
      'A: (Age of 60) A has high blood pressure and heart disease',
      'B: (Age of 12) B has diabetes and just left the hospital because of his broken bones',
      'C: (Age of 30) C has regular issues with blurred vision',
      'D: (Age of 3) D has a fever and cough very often']
  ],
  ],
  [
    ['How to reduce the risk of being poisoned by Aflatoxins or Ochratoxin?',[
      'Always remove the fungi on the food by washing it thoroughly or removing its surface',
      'Never have food with fungi on the surface,Always cook the food at a high temperature',
      'Never place the food inside a cupboard since it might be moist']
    ],
    ['How do people get poisoned by Ochratoxin?',[
      'People consume the animal product that the animals have food Ochratoxin contains',
      'People touch food that is poisoned by Ochratoxin',
      'People cook food at extremely high temperatures',
      'People consume too much processed animal food']
    ],
    ['Which statement about Acetaldehyde is true?',['Humans may get poisoned by Acetaldehyd e when consuming meat or processed products from weeds',
      'People with Aldehyde dehydrogenas e 2 (ALDH2) deficiency are more easily to get cancer in the digestive tract. It is because their bodies cannot properly utilize Acetaldehyde as those without the symptoms',
      'Acetaldehyde is a toxic metabolite produced by specific types of fungi and they are commonly present in food as mixtures',
      'Acetaldehyd e produces tumors in experimenta l animals often on the liver']
    ],
    ['Which of the substance is not related to fungi?',['Aflatoxins,Ochratoxin A,Acetaldehyd e,Fusarium']
  ],
    ['What kind of people has a higher risk of exposure to Acrylamide?',[
      'Those who frequently smoke',
      'Those who enjoy fried potatoes which are cooked under a high temperature',
      'Those who have diabetes',
      'Those who frequently drink wine']
    ]
  ],
  [
    ['What are the causes of sea level rise?',['A. Thermal expansion',
      'B. Melting of the floating iceberg in the seas',
      'C. Melting of the ice sheets and glaciers on the land',
      'D. Human development near the coasts']
    ],
    ['Which statement about the rising sea level trend in the 70s is correct?',[
      'The sea level rising problem had accelerated during that time because of the thrives of heavy industries',
      'Because of many dams newly constructed worldwide the sea level rising trend slowed down',
      'Because of thrives of industries in developing countries the water requirement rose. Therefore the sea level rising trend slowed down',
      'The growing population in the coastal area accelerated the rising speed of sea level']
    ],
    ['Which sentence is correct about thermal expansion?',[
      'It is about the phenomenon of the water expanding volume by heat',
      'When the air temperature goes up the phenomenon mitigate',
      'It only happens when the temperature is larger than 0 degrees Celsius',
      'The phenomenon is not easily observed therefore we still don\'t know to what extent it accounts for the rising sea level.']
    ],
    ['Which sentence best describes the possible cause of the sea level rise?',[
      'A. Ice- breaking ships change the climate because the shattered ice is more easily melted into the sea',
      'B. Several disasters such as floods',
      'C. During these years, the increase of industrial wastewater in the sea has had a huge impact because of pollution',
      'D. Even if greenhouse gas emissions stabilize in the future thermal expansion will continue to raise the sea level for many decades']
    ],
    [
      'Which treatment do you consider useful methods to mitigate the rising sea level? (multiple choices)',[
        'A. Reduce the consumption of fossil fuels or oil',
        'B. Stop using ice-breaking ships',
        'C. Reduce human activities in the sea',
        'D. Reduce deforestation activities'
    ]
    ]
  ]
]

/**@type {Question[][]} */
const SCENE_QUESTIONS_LIST = []

for (let scene_idx = 0; scene_idx < SCENE_NUM; ++scene_idx) {
  const curr_scene_questions_data = SCENE_MIDGAME_QUESTION_LIST[scene_idx];
  const curr_scene_questions = [];
  for (let question_i = 0; question_i < curr_scene_questions_data.length; ++question_i) {
    const curr_question = curr_scene_questions_data[question_i];
    curr_scene_questions.push(new Question(curr_question[0], curr_question[1]));
  }
  SCENE_QUESTIONS_LIST.push(curr_scene_questions);
}

/**
 * 
 * @param {number} scene_id 
 * @param {number} scene_type_id 
 * @return {Question[]} Scene Midgame Questions
 */
export function get_scene_midgame_survey_questions(scene_id, scene_type_id) {
  return SCENE_QUESTIONS_LIST[calc_scene_idx_fn(scene_id, scene_type_id)]
}