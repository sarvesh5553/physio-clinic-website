import { NextResponse } from "next/server";

/*
============================================================
DR. BHAGYASHRI SALUNKE PHYSIOCARE
WEBSITE CHATBOT
============================================================

This chatbot is intentionally restricted to information
about the doctor's website and physiotherapy services.

Common questions are answered directly for speed.

Only questions that need natural-language understanding
are sent to Gemini.
*/


/*
============================================================
VERIFIED WEBSITE INFORMATION
============================================================
*/

const WEBSITE_INFORMATION = `
You are the official website assistant for
Dr. Bhagyashri Salunke PhysioCare.

You are NOT a general-purpose AI assistant.

You may ONLY answer questions related to:

- Dr. Bhagyashri Salunke
- Her qualifications
- Her professional certifications
- Physiotherapy
- Rehabilitation
- Services provided
- Conditions treated
- Home visit physiotherapy
- Home visit areas
- Online physiotherapy
- Patients outside Pune
- Consultation timings
- Doctor availability
- Appointments
- Contact information
- Information available on the clinic website

==================================================
DOCTOR
==================================================

Name:
Dr. Bhagyashri Salunke (PT)

Professional title:
Physiotherapist & Rehabilitation Specialist

Educational qualification:
Bachelor of Physiotherapy (BPT)

==================================================
PROFESSIONAL CERTIFICATIONS
==================================================

- Certified Diversified Needling Therapist
- Certified Diversified Cupping Therapist
- Certified IAFM Therapist
- Therapeutic Taping Practitioner

==================================================
CONTACT
==================================================

Phone:
+91 9322518895

Email:
drbhagyashrisalunkept@gmail.com

==================================================
CONSULTATION
==================================================

Consultation type:

Online / Offline

Availability:

Monday to Saturday
10:00 AM to 8:00 PM

Sunday:
Not available

Consultations are on an OPD basis.

==================================================
HOME VISITS
==================================================

Home visit physiotherapy is available in Pune and nearby areas.

Areas include:

- Pirangut
- Baner
- Hinjawadi
- Balewadi
- Pashan
- Wakad
- Nearby areas

Home visits are arranged by appointment.

Visitors should contact Dr. Bhagyashri to confirm:

- availability
- suitable timing
- location coverage
- appointment details

Do not invent separate home-visit timings.

==================================================
ONLINE PHYSIOTHERAPY
==================================================

Online physiotherapy consultations are available.

Patients outside Pune can also receive online physiotherapy,
subject to appointment availability.

==================================================
SERVICES
==================================================

- Electrotherapy
- Pain Management
- Manual Therapy
- Exercise Therapy
- Neuro Rehabilitation
- Sports Rehabilitation
- Post Surgical Rehab
- Posture Correction
- Dry Needling
- Dry & Wet Cupping
- Kinesio Taping

==================================================
CONDITIONS
==================================================

- Back Pain
- Neck Pain
- Sciatica
- Frozen Shoulder
- Arthritis
- Knee Pain
- Shoulder Pain
- Tennis Elbow
- Slip Disc
- Sports Injury
- Hip Pain
- Ankle Sprain
- Muscle Strain
- Joint Stiffness
- Postural Problems
- Ligament Injury
- Plantar Fasciitis
- Chronic Pain

==================================================
ANSWER STYLE
==================================================

Always sound like a professional clinic receptionist.

Use complete sentences.

Keep answers concise.

Normally use 1-4 sentences.

When listing several items, use bullet points.

Never give incomplete answers.

Never simply answer:

"Dr. Bhagyashri Salunke"

Instead provide a complete professional answer.

==================================================
MEDICAL SAFETY
==================================================

Do not diagnose patients.

Do not prescribe medicines.

Do not prescribe personalized treatment.

Do not guarantee results.

If a patient describes symptoms and asks what condition
they have, explain that proper assessment is required.

==================================================
STRICT WEBSITE-ONLY RULE
==================================================

Do not answer unrelated questions about:

- Politics
- Cricket
- General sports
- Celebrities
- Movies
- News
- Weather
- Coding
- Programming
- Homework
- Mathematics
- General knowledge
- Recipes
- Travel
- Finance
- Technology
- Other doctors
- Other clinics
- Other businesses

For unrelated questions, respond:

"I'm here to assist with information about Dr. Bhagyashri's
physiotherapy services, conditions treated, home visits,
online physiotherapy, appointments and availability.
Please ask me something related to the clinic or its services."

==================================================
UNKNOWN INFORMATION
==================================================

Never guess.

If information is not available above, say:

"I don't have that specific information available.
Please contact Dr. Bhagyashri directly at
+91 9322518895 for confirmation."
`;


/*
============================================================
HELPER
============================================================
*/

function hasAny(
  text: string,
  keywords: string[]
): boolean {
  return keywords.some((keyword) =>
    text.includes(keyword)
  );
}


/*
============================================================
POST
============================================================
*/

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const message =
      typeof body?.message === "string"
        ? body.message.trim()
        : "";

    if (!message) {
      return NextResponse.json(
        {
          error: "Please enter a question.",
        },
        {
          status: 400,
        }
      );
    }

    const text = message
      .toLowerCase()
      .replace(/[?!.,]/g, " ")
      .replace(/\s+/g, " ")
      .trim();


    /*
    ============================================================
    FAST ANSWERS

    These do NOT call Gemini.
    Therefore they should respond much faster.
    ============================================================
    */


    /*
    ------------------------------------------------------------
    SUNDAY
    ------------------------------------------------------------
    */

    if (
      text.includes("sunday") &&
      hasAny(text, [
        "available",
        "open",
        "working",
        "work",
        "appointment",
        "consultation",
        "doctor",
      ])
    ) {
      return NextResponse.json({
        answer:
          "Dr. Bhagyashri is not available on Sundays. Her regular consultation availability is Monday to Saturday, from 10:00 AM to 8:00 PM, on an OPD basis. For appointment assistance, please contact the doctor at +91 9322518895.",
      });
    }


    /*
    ------------------------------------------------------------
    REGULAR TIMINGS
    ------------------------------------------------------------
    */

    if (
      hasAny(text, [
        "timing",
        "timings",
        "working hours",
        "working time",
        "consultation hours",
        "consultation time",
        "opening hours",
        "when is doctor available",
        "when is the doctor available",
      ]) &&
      !hasAny(text, [
        "home visit",
        "home visits",
        "home physiotherapy",
      ])
    ) {
      return NextResponse.json({
        answer:
          "Dr. Bhagyashri is available for online and offline consultations from Monday to Saturday, 10:00 AM to 8:00 PM, on an OPD basis. She is not available on Sundays.",
      });
    }


    /*
    ------------------------------------------------------------
    HOME VISITS
    ------------------------------------------------------------
    */

    if (
      hasAny(text, [
        "home visit",
        "home visits",
        "home physiotherapy",
        "physiotherapy at home",
        "physio at home",
        "visit at home",
        "come to my home",
        "treatment at home",
      ])
    ) {
      return NextResponse.json({
        answer:
          "Yes, home visit physiotherapy is available in Pune and nearby areas, including Pirangut, Baner, Hinjawadi, Balewadi, Pashan and Wakad. Home visits are arranged by appointment, so please contact Dr. Bhagyashri at +91 9322518895 to confirm availability, location coverage and a suitable timing.",
      });
    }


    /*
    ------------------------------------------------------------
    ONLINE PHYSIOTHERAPY
    ------------------------------------------------------------
    */

    if (
      hasAny(text, [
        "online physiotherapy",
        "online physio",
        "online consultation",
        "online treatment",
        "online session",
        "outside pune",
        "not in pune",
        "out of pune",
      ])
    ) {
      return NextResponse.json({
        answer:
          "Yes, online physiotherapy consultations are available. Patients outside Pune can also receive online physiotherapy, subject to appointment availability.",
      });
    }


    /*
    ------------------------------------------------------------
    CONTACT
    ------------------------------------------------------------
    */

    if (
      hasAny(text, [
        "contact",
        "phone number",
        "phone",
        "mobile number",
        "mobile",
        "call doctor",
        "call the doctor",
        "email",
        "email address",
      ])
    ) {
      return NextResponse.json({
        answer:
          "You can contact Dr. Bhagyashri Salunke at +91 9322518895. You can also email her at drbhagyashrisalunkept@gmail.com.",
      });
    }


    /*
    ------------------------------------------------------------
    QUALIFICATION
    ------------------------------------------------------------
    */

    if (
      hasAny(text, [
        "qualification",
        "qualifications",
        "education",
        "educational qualification",
        "educational qualifications",
        "degree",
        "degrees",
        "bpt",
        "bachelor of physiotherapy",
        "what did doctor study",
        "what has doctor studied",
      ])
    ) {
      return NextResponse.json({
        answer:
          "Dr. Bhagyashri Salunke (PT) is a Physiotherapist & Rehabilitation Specialist. She has completed a Bachelor of Physiotherapy (BPT).",
      });
    }


    /*
    ------------------------------------------------------------
    CERTIFICATIONS
    ------------------------------------------------------------
    */

    if (
      hasAny(text, [
        "certification",
        "certifications",
        "certified",
        "certificate",
        "certificates",
        "credentials",
      ])
    ) {
      return NextResponse.json({
        answer:
          "Dr. Bhagyashri Salunke (PT) is a Physiotherapist & Rehabilitation Specialist. Her professional certifications include:\n\n• Certified Diversified Needling Therapist\n• Certified Diversified Cupping Therapist\n• Certified IAFM Therapist\n• Therapeutic Taping Practitioner",
      });
    }


    /*
    ------------------------------------------------------------
    ABOUT DOCTOR
    ------------------------------------------------------------
    */

    if (
      hasAny(text, [
        "who is doctor",
        "who is the doctor",
        "who is bhagyashri",
        "about doctor",
        "about the doctor",
        "about bhagyashri",
        "doctor profile",
        "doctor information",
      ])
    ) {
      return NextResponse.json({
        answer:
          "Dr. Bhagyashri Salunke (PT) is a Physiotherapist & Rehabilitation Specialist with a Bachelor of Physiotherapy (BPT). She provides personalized, evidence-based physiotherapy care for pain, injuries and movement limitations through online and offline consultations.",
      });
    }


    /*
    ------------------------------------------------------------
    SERVICES
    ------------------------------------------------------------
    */

    if (
      hasAny(text, [
        "services",
        "service",
        "what services",
        "what do you provide",
        "what does doctor provide",
        "physiotherapy services",
        "treatment services",
      ])
    ) {
      return NextResponse.json({
        answer:
          "Dr. Bhagyashri provides a range of physiotherapy and rehabilitation services, including:\n\n• Electrotherapy\n• Pain Management\n• Manual Therapy\n• Exercise Therapy\n• Neuro Rehabilitation\n• Sports Rehabilitation\n• Post Surgical Rehab\n• Posture Correction\n• Dry Needling\n• Dry & Wet Cupping\n• Kinesio Taping",
      });
    }


    /*
    ------------------------------------------------------------
    CONDITIONS
    ------------------------------------------------------------
    */

    if (
      hasAny(text, [
        "conditions",
        "condition treated",
        "conditions treated",
        "what do you treat",
        "what conditions",
        "which conditions",
        "problems treated",
        "injuries treated",
      ])
    ) {
      return NextResponse.json({
        answer:
          "The website lists physiotherapy care for conditions including:\n\n• Back Pain\n• Neck Pain\n• Sciatica\n• Frozen Shoulder\n• Arthritis\n• Knee Pain\n• Shoulder Pain\n• Tennis Elbow\n• Slip Disc\n• Sports Injury\n• Hip Pain\n• Ankle Sprain\n• Muscle Strain\n• Joint Stiffness\n• Postural Problems\n• Ligament Injury\n• Plantar Fasciitis\n• Chronic Pain",
      });
    }


    /*
    ------------------------------------------------------------
    APPOINTMENTS
    ------------------------------------------------------------
    */

    if (
      hasAny(text, [
        "appointment",
        "appointments",
        "book appointment",
        "booking",
        "book a session",
        "schedule",
      ])
    ) {
      return NextResponse.json({
        answer:
          "Appointments are available for online and offline physiotherapy consultations from Monday to Saturday, 10:00 AM to 8:00 PM, on an OPD basis. To enquire about or arrange an appointment, please contact Dr. Bhagyashri at +91 9322518895.",
      });
    }


    /*
    ============================================================
    GEMINI
    ============================================================

    Only questions that need natural-language understanding
    reach Gemini.

    We use Gemini 3.5 Flash-Lite for lower latency.
    ============================================================
    */

    const apiKey =
      process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error(
        "GEMINI_API_KEY is missing."
      );

      return NextResponse.json(
        {
          error:
            "The chatbot configuration is incomplete. Please contact the website administrator.",
        },
        {
          status: 500,
        }
      );
    }


    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },

        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: WEBSITE_INFORMATION,
              },
            ],
          },

          contents: [
            {
              role: "user",

              parts: [
                {
                  text: message,
                },
              ],
            },
          ],

          generationConfig: {
            maxOutputTokens: 220,
          },
        }),
      }
    );


    const data = await response.json();


    /*
    ------------------------------------------------------------
    GEMINI ERROR
    ------------------------------------------------------------
    */

    if (!response.ok) {
      console.error(
        "Gemini API error:",
        data
      );

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "The chatbot is temporarily unavailable. Please contact Dr. Bhagyashri directly at +91 9322518895.",
        },
        {
          status: response.status,
        }
      );
    }


    /*
    ------------------------------------------------------------
    EXTRACT ANSWER
    ------------------------------------------------------------
    */

    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map(
          (part: { text?: string }) =>
            part.text || ""
        )
        .join("")
        .trim();


    /*
    ------------------------------------------------------------
    EMPTY RESPONSE
    ------------------------------------------------------------
    */

    if (!answer) {
      return NextResponse.json({
        answer:
          "I don't have that specific information available. Please contact Dr. Bhagyashri directly at +91 9322518895 for confirmation.",
      });
    }


    /*
    ------------------------------------------------------------
    FINAL RESPONSE
    ------------------------------------------------------------
    */

    return NextResponse.json({
      answer,
    });


  } catch (error) {
    console.error(
      "Chat route error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "The chatbot is temporarily unavailable. Please contact Dr. Bhagyashri directly at +91 9322518895.",
      },
      {
        status: 500,
      }
    );
  }
}