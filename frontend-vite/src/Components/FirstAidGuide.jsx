import { useState } from "react";
import cprImg from "../assets/firstaid/cpr.jpg";
import asthmaImg from "../assets/firstaid/asthma.jpg";
import bleedingImg from "../assets/firstaid/bleeding.jpg";
import burnsImg from "../assets/firstaid/burns.jpg";
import chokingImg from "../assets/firstaid/choking.jpg";
import fractureImg from "../assets/firstaid/fracture.jpg";
import heartattackImg from "../assets/firstaid/heartattack.jpg";
import heatstrokeImg from "../assets/firstaid/heatstroke.jpg";
import hypothermiaImg from "../assets/firstaid/hypothermia.jpg";
import nosebleedingImg from "../assets/firstaid/nosebleeding.jpg";
import poisoningImg from "../assets/firstaid/poisoning.jpg";
import seizureImg from "../assets/firstaid/seizure.jpg";
import shockImg from "../assets/firstaid/shock.jpg";
import sprainsImg from "../assets/firstaid/sprains.jpg";
import strokeImg from "../assets/firstaid/stroke.jpg";

const firstAidData = [
  {
    id: 1,
    title: "CPR (Cardiopulmonary Resuscitation)",
    image: cprImg,
    steps: [
      "Gently shake the person and ask loudly if they're okay. Look for normal breathing.",
      "Call emergency services or ask someone nearby to call.",
      "Place both hands in the center of the chest and press down hard and fast (about 2 inches deep), 30 times.",
      "If trained, give 2 mouth-to-mouth rescue breaths after 30 compressions. Repeat this cycle until help arrives.",
    ],
    caution:
      "Do not delay calling emergency services. Only give rescue breaths if you know how.",
  },
  {
    id: 2,
    title: "Bleeding",
    image: bleedingImg,
    steps: [
      "Put a clean cloth or bandage on the bleeding area and press firmly.",
      "If possible, raise the bleeding part above the heart level to slow the bleeding.",
      "If something is stuck in the wound, do not remove it. Press around it instead.",
      "If bleeding continues after 10 minutes of pressure, call for emergency help.",
    ],
    caution: "Do not use a tourniquet unless you are trained to do so.",
  },
  {
    id: 3,
    title: "Burns",
    image: burnsImg,
    steps: [
      "Hold the burned area under cool (not cold) running water for 20 minutes.",
      "Carefully remove any tight items like rings or clothing near the burn area before swelling starts.",
      "Cover the burn with a clean, non-sticky cloth or plastic wrap to protect it.",
    ],
    caution: "Do not apply ice, butter, creams, or toothpaste to the burn.",
  },
  {
    id: 4,
    title: "Choking",
    image: chokingImg,
    steps: [
      "Ask the person if they are choking. If they can’t speak, cough, or breathe, they need help.",
      "Stand behind them and give 5 sharp back blows between their shoulder blades with the palm of your hand.",
      "Then, stand behind them, wrap your arms around their waist and give 5 quick inward and upward thrusts (Heimlich maneuver).",
      "Repeat back blows and abdominal thrusts until the object comes out or help arrives.",
    ],
    caution:
      "Never hit someone who is coughing or breathing. Use chest thrusts for infants instead.",
  },
  {
    id: 5,
    title: "Fractures",
    image: fractureImg,
    steps: [
      "Help the person stay still and calm. Do not move the broken area.",
      "Use a cloth or board to gently support and keep the area still (immobilize it).",
      "Apply a cold pack wrapped in cloth to reduce pain and swelling.",
      "Call for medical help or go to a hospital immediately.",
    ],
    caution: "Do not try to straighten or push bones back inside.",
  },
  {
    id: 6,
    title: "Nosebleeds",
    image: nosebleedingImg,
    steps: [
      "Ask the person to sit down and lean forward slightly (not backward).",
      "Pinch the soft part of their nose and hold it for 10 to 15 minutes.",
      "You can put a cold pack on the nose or neck to help stop the bleeding.",
    ],
    caution:
      "Leaning backward may cause blood to go into the throat, which can cause choking.",
  },
  {
    id: 7,
    title: "Shock",
    image: shockImg,
    steps: [
      "Have the person lie down on their back and raise their legs slightly if there’s no injury.",
      "Keep them warm using a blanket or jacket.",
      "Stay with them, keep them calm, and check their breathing.",
      "Call emergency services right away.",
    ],
    caution: "Do not give the person food or drink, even if they ask.",
  },
  {
    id: 8,
    title: "Seizures",
    image: seizureImg,
    steps: [
      "Clear the area around the person so they don’t hit anything hard or sharp.",
      "Place something soft under their head to protect it.",
      "Do not try to stop their movements or put anything in their mouth.",
      "After the seizure ends, gently roll them onto their side and stay with them until they are fully alert.",
    ],
    caution:
      "Call emergency help if it’s their first seizure or it lasts more than 5 minutes.",
  },
  {
    id: 9,
    title: "Poisoning",
    image: poisoningImg,
    steps: [
      "Try to find out what the person swallowed or was exposed to.",
      "Call emergency services or a poison control center immediately.",
      "Keep the person still and calm. Do not give them anything to eat or drink.",
    ],
    caution:
      "Do not make them vomit unless a doctor or poison center tells you to.",
  },
  {
    id: 10,
    title: "Heatstroke",
    image: heatstrokeImg,
    steps: [
      "Move the person to a cool, shaded place right away.",
      "Take off extra clothes to help cool them down.",
      "Use a wet cloth or spray water on them and fan them.",
      "Call emergency services — this is very serious and needs quick help.",
    ],
    caution:
      "Do not give anything to drink if they are confused or unconscious.",
  },
  {
    id: 11,
    title: "Hypothermia",
    image: hypothermiaImg,
    steps: [
      "Move the person indoors or out of the cold wind or rain.",
      "Take off any wet clothes and wrap them in dry blankets.",
      "If they are awake, give warm (not hot) drinks slowly.",
    ],
    caution:
      "Do not use hot water bottles or heating pads directly on skin. It can cause burns.",
  },
  {
    id: 12,
    title: "Sprains and Strains",
    image: sprainsImg,
    steps: [
      "Let the injured part rest. Avoid using it for a while.",
      "Apply an ice pack wrapped in cloth for 15–20 minutes every few hours.",
      "Wrap the area with an elastic bandage, but not too tightly.",
      "Raise the part above heart level using a pillow to reduce swelling.",
    ],
    caution: "Do not apply heat or massage for the first 48 hours.",
  },
  {
    id: 13,
    title: "Asthma Attack",
    image: asthmaImg,
    steps: [
      "Help the person sit up straight and remain calm.",
      "Let them use their reliever inhaler (usually a blue one), one puff every 30-60 seconds, up to 10 puffs.",
      "If breathing does not improve, call emergency services immediately.",
    ],
    caution:
      "Do not make the person lie down. They may breathe better while sitting.",
  },
  {
    id: 14,
    title: "Heart Attack",
    image: heartattackImg,
    steps: [
      "Call emergency services immediately — every minute counts.",
      "Have the person sit and rest. Stay calm and talk to them.",
      "Loosen any tight clothing like collars or belts.",
      "If they are not allergic to aspirin, give one to chew slowly.",
    ],
    caution: "Do not leave the person alone or delay calling for help.",
  },
  {
    id: 15,
    title: "Stroke",
    image: strokeImg,
    steps: [
      "Remember FAST: Face (drooping?), Arm (can they lift both?), Speech (slurred?), Time (call emergency services).",
      "Lay them down with their head slightly raised.",
      "Keep them calm and note the time the symptoms started.",
    ],
    caution:
      "Do not give them food, water, or medicine unless instructed by a doctor.",
  },
];

const FirstAidGuide = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 mt-5 text-center">
        🩺 First Aid Guidance
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-start">
        {firstAidData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col border rounded-xl shadow-md overflow-hidden bg-white transition-all duration-300"
          >
            <button
              onClick={() => toggleExpand(item.id)}
              className="bg-neutral-100 hover:bg-sky-100 text-left p-2 font-semibold text-lg"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-t-xl mb-2"
                />
              )}
              {item.title}
            </button>

            {expandedId === item.id && (
              <div className="p-4 text-sm">
                <ol className="list-decimal ml-5 space-y-1 mb-2">
                  {item.steps.map((step, index) => (
                    <li key={index} className="font-semibold">{step}</li>
                  ))}
                </ol>
                <p className="text-red-600">
                  <strong>⚠️ Caution:</strong> {item.caution}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirstAidGuide;
