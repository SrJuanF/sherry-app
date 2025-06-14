import { NextRequest, NextResponse } from "next/server";
import { avalancheFuji } from "viem/chains";
import {
  createMetadata,
  Metadata,
  ValidatedMetadata,
  ExecutionResponse,
} from "@sherrylinks/sdk";
import { serialize } from "wagmi";
import { encodeFunctionData, TransactionSerializable } from 'viem';
import { abi } from "./abi";


const CONTRACT_ADDRESS = "0x660cBF691952278bc54265Dfa0E8f1595A4473Ca";//"0x6C5d04ae1C143446639a22f8ae32dd30646eC94e";

export async function GET(req: NextRequest) {
  try {
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const serverUrl = `${protocol}://${host}`;

    const metadata: Metadata = {
      url: "https://sherry.social",
      icon: "https://estudiarvirtual.unipiloto.edu.co/hubfs/Imported_Blog_Media/Top-10-de-empresarios-colombianos-1.webp",//"https://avatars.githubusercontent.com/u/117962315",
      title: "Culturas Empresariales En El Mundo",
      baseUrl: serverUrl,
      description: "Complete el siguiente formulario para conocer desde su forma de hacer negocios con que culturas empresariales en el mundo es más compatible.",
      actions: [
        {
          type: "dynamic",
          label: "Descubre Con Cuales Culturas Eres Compatible En Los Negocios",
          description: "Responde 6 preguntas sobre tus preferencias y comportamientos en los negocios para saber cuales culturas empresariales son más compatibles contigo.(Ver resultados en Snowtrace -> Logs de la transacción)",
          chains: { source: "fuji" },
          path: "/api/valuesCulture",
          params: [
            {
              name: "communication",
              label: "Estilo de Comunicación",
              type: "select",
              options: [
                {
                  label: "Indirecta y reservada",
                  value: "indirect_reserved",
                },
                { label: "Directa, abierta", value: "direct_open" },
                {
                  label: "Indirecta, armonía",
                  value: "indirect_harmony",
                },
                {
                  label: "Informal, emocional",
                  value: "informal_emotional",
                },
                {
                  label: "Indirecta, humorística",
                  value: "indirect_humorous",
                },
                {
                  label: "Indirecta, cuidadosa",
                  value: "indirect_careful",
                },
                { label: "Directa, clara", value: "direct_clear" },
                { label: "Formal, lógica", value: "formal_logical" },
                {
                  label: "Indirecta, deferente",
                  value: "indirect_deferent",
                },
                {
                  label: "Indirecta, educada",
                  value: "indirect_polite",
                },
                {
                  label: "Indirecta, muy formal",
                  value: "indirect_very_formal",
                },
                {
                  label: "Indirecta, armoniosa",
                  value: "indirect_harmonious",
                },
                {
                  label: "Indirecta, cordial",
                  value: "indirect_cordial",
                },
                {
                  label: "Directa, pragmática",
                  value: "direct_pragmatic",
                },
                {
                  label: "Directa pero emocional",
                  value: "direct_emotional",
                },
              ],
              required: true,
            },
            {
              name: "hierarchy",
              label: "Nivel de Jerarquía",
              type: "select",
              options: [
                {
                  label: "Baja jerarquía",
                  value: "low_hierarchy",
                },
                {
                  label: "Igualitaria",
                  value: "egalitarian",
                },
                {
                  label:
                    "Alta jerarquía",
                  value: "high_hierarchy",
                },
                {
                  label: "Tradicional, media",
                  value: "traditional_medium",
                },
                { label: "Media, formal", value: "medium_formal" },
                {
                  label: "Muy alta jerarquía",
                  value: "very_high_hierarchy",
                },
              ],
              required: true,
            },
            {
              name: "personal_relationships",
              label: "Enfoque en Relaciones Personales",
              type: "select",
              options: [
                {
                  label: "Trabajo en equipo, consenso",
                  value: "teamwork_consensus",
                },
                { label: "Independientes", value: "independent" },
                {
                  label: "Centradas en la familia",
                  value: "family_centric",
                },
                {
                  label: "Confianza personal",
                  value: "personal_trust",
                },
                {
                  label: "Cordialidad, privacidad",
                  value: "cordiality_privacy",
                },
                { label: "Guanxi (red de favores)", value: "guanxi" },
                {
                  label: "Profesionales, formales",
                  value: "professional_formal",
                },
                { label: "Conversacionales", value: "conversational" },
                {
                  label: "Familia extendida",
                  value: "extended_family",
                },
                {
                  label: "Hospitalidad, armonía",
                  value: "hospitality_harmony",
                },
                {
                  label: "Grupo antes que individuo",
                  value: "group_before_individual",
                },
                {
                  label: "Hospitalidad, respeto",
                  value: "hospitality_respect",
                },
                {
                  label: "Amistad, familia ampliada",
                  value: "friendship_extended_family",
                },
                {
                  label: "Cordial pero reservada",
                  value: "cordial_reserved",
                },
                {
                  label: "Lealtad a familia/amigos",
                  value: "loyalty_family_friends",
                },
              ],
              required: true,
            },
            {
              name: "time_orientation",
              label: "Orientación Temporal",
              type: "select",
              options: [
                {
                  label: "Futuro y pasado",
                  value: "future_past",
                },
                {
                  label: "Orientada al futuro",
                  value: "future_oriented",
                },
                {
                  label: "Presente, con fatalismo",
                  value: "present_fatalism",
                },
                {
                  label: "Flexible",
                  value: "flexible",
                },
                { label: "Moderada", value: "moderate" },
                {
                  label: "Futuro y largo plazo",
                  value: "future_long_term",
                },
                {
                  label: "Futuro, ordenado",
                  value: "future_ordered",
                },
                {
                  label: "Presente con orgullo",
                  value: "present_pride",
                },
                {
                  label: "Mixta (karma, tradición)",
                  value: "mixed_karma_tradition",
                },
                { label: "Pasado y presente", value: "past_present" },
                {
                  label: "Flexible, polícroma",
                  value: "flexible_polychronic",
                },
                {
                  label: "Presente con tradición",
                  value: "present_tradition",
                },
                {
                  label: "Orientada a la planificación",
                  value: "planning_oriented",
                },
                {
                  label: "Pasado, estabilidad",
                  value: "past_stability",
                },
              ],
              required: true,
            },
            {
              name: "decision_making",
              label: "Estilo de Toma de Decisiones",
              type: "select",
              options: [
                {
                  label: "Lenta, basada en consenso",
                  value: "slow_consensus",
                },
                {
                  label: "Rápida, individualista",
                  value: "fast_individualistic",
                },
                {
                  label: "Lenta, consulta previa",
                  value: "slow_prior_consultation",
                },
                {
                  label: "Basada en relaciones",
                  value: "relationship_based",
                },
                {
                  label: "Pragmática, basada en consenso",
                  value: "pragmatic_consensus",
                },
                {
                  label: "Lenta, armonía interpersonal",
                  value: "slow_interpersonal_harmony",
                },
                {
                  label: "Basada en reglas, racional",
                  value: "rule_based_rational",
                },
                {
                  label: "Lenta, jerárquica",
                  value: "slow_hierarchical",
                },
                {
                  label: "Jerárquica, relacional",
                  value: "hierarchical_relational",
                },
                {
                  label: "Centralizada, lenta",
                  value: "centralized_slow",
                },
                {
                  label: "Jerárquica, ritualizada",
                  value: "hierarchical_ritualized",
                },
                {
                  label: "Colectiva, relacional",
                  value: "collective_relational",
                },
                {
                  label: "Consenso (overleg)",
                  value: "consensus_overleg",
                },
                {
                  label: "Centralizada, cautelosa",
                  value: "centralized_cautious",
                },
              ],
              required: true,
            },
            {
              name: "prominent_values",
              label: "Valores Prominentes/Core",
              type: "select",
              options: [
                {
                  label:
                    "Precisión, puntualidad, confiabilidad",
                  value: "precision_punctuality_reliability",
                },
                {
                  label: "Individualismo, eficiencia, logro personal",
                  value: "individualism_efficiency_personal_achievement",
                },
                {
                  label: "Honor, relaciones, respeto, cortesía",
                  value: "honor_relationships_respect_courtesy",
                },
                {
                  label: "Familia, calidez, diversidad",
                  value: "family_warmth_diversity",
                },
                {
                  label: "Moderación, respeto, tradición",
                  value: "moderation_respect_tradition",
                },
                {
                  label: "Grupo, armonía, estatus, orden",
                  value: "group_harmony_status_order",
                },
                {
                  label: "Precisión, seguridad, estructura",
                  value: "precision_security_structure",
                },
                {
                  label: "Individualismo, lógica, orgullo nacional",
                  value: "individualism_logic_national_pride",
                },
                {
                  label: "Espiritualidad, educación, respeto",
                  value: "spirituality_education_respect",
                },
                {
                  label: "Respeto, tradición, comunidad",
                  value: "respect_tradition_community",
                },
                {
                  label: "Cooperación, respeto, tradición",
                  value: "cooperation_respect_tradition",
                },
                {
                  label: "Multiculturalismo, religión, educación",
                  value: "multiculturalism_religion_education",
                },
                {
                  label: "Familia, armonía, religión",
                  value: "family_harmony_religion",
                },
                {
                  label: "Pragmatismo, frugalidad, apertura",
                  value: "pragmatism_frugality_openness",
                },
                {
                  label: "Resistencia, orgullo, alma",
                  value: "resistance_pride_russian_soul",
                },
              ],
              required: true,
            },
          ],
        },
      ],
    };

    const validated: ValidatedMetadata = createMetadata(metadata);

    return NextResponse.json(validated, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create metadata" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const communication = searchParams.get("communication");
    const hierarchy = searchParams.get("hierarchy");
    const personal_relationships = searchParams.get("personal_relationships");
    const time_orientation = searchParams.get("time_orientation");
    const decision_making = searchParams.get("decision_making");
    const prominent_values = searchParams.get("prominent_values");

    if (!communication || !hierarchy || !personal_relationships || !time_orientation || !decision_making || !prominent_values) {
      return NextResponse.json(
        { error: "Required parameter missing" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    // Custom business logic
    //const optimizedTimestamp = calculateOptimizedTimestamp(message);

    const culturesOut = getCultures(communication, hierarchy, personal_relationships, time_orientation, decision_making, prominent_values);

    // Encode the contract function data
    const data = encodeFunctionData({
      abi: abi,
      functionName: "pickCultures",
      args: [culturesOut[0].indexCulture, culturesOut[1].indexCulture],
    });

    const valueFee = 0.01 * 1e18; // 0.01 AVAX in wei (assuming 18 decimals for AVAX)

    // Create smart contract transaction
    const tx: TransactionSerializable = {
      to: CONTRACT_ADDRESS,
      value: BigInt(valueFee),
      data: data,
      chainId: avalancheFuji.id,
      type: 'legacy',
    };

    const serialized = serialize(tx);

    const resp: ExecutionResponse = {
      serializedTransaction: serialized,
      chainId: avalancheFuji.name,
    };

    return NextResponse.json(resp, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
    },
  });
}

function getCultures(
  communication: string,
  hierarchy: string,
  personal_relationships: string,
  time_orientation: string,
  decision_making: string,
  prominent_values: string
) {

  return cultures.map((culture) => {
    let score = 0;

    if (culture.communication === communication) score++;
    if (culture.hierarchy === hierarchy) score++;
    if (culture.personal_relationships === personal_relationships) score++;
    if (culture.time_orientation === time_orientation) score++;
    if (culture.decision_making === decision_making) score++;
    if (culture.prominent_values === prominent_values) score++;

    return {
      culture: culture.name,
      score,
      indexCulture: cultures.indexOf(culture),
    };
  }).sort((a, b) => b.score - a.score); // Ordena de mayor a menor

  /*const mostCompatible = results[0];
  console.log("La cultura más compatible es:", mostCompatible.culture);
  console.log("Puntaje de compatibilidad:", mostCompatible.score);*/
}

const cultures = [
  {
    name: "German Switzerland",
    communication: "indirect_reserved",
    hierarchy: "low_hierarchy",
    personal_relationships: "teamwork_consensus",
    time_orientation: "future_past",
    decision_making: "slow_consensus",
    prominent_values: "precision_punctuality_reliability",
  },
  {
    name: "USA",
    communication: "direct_open",
    hierarchy: "egalitarian",
    personal_relationships: "independent",
    time_orientation: "future_oriented",
    decision_making: "fast_individualistic",
    prominent_values: "individualism_efficiency_personal_achievement",
  },
  {
    name: "Arab",
    communication: "indirect_harmony",
    hierarchy: "high_hierarchy",
    personal_relationships: "family_centric",
    time_orientation: "present_fatalism",
    decision_making: "slow_prior_consultation",
    prominent_values: "honor_relationships_respect_courtesy",
  },
  {
    name: "Brazil",
    communication: "informal_emotional",
    hierarchy: "high_hierarchy",
    personal_relationships: "personal_trust",
    time_orientation: "flexible",
    decision_making: "relationship_based",
    prominent_values: "family_warmth_diversity",
  },
  {
    name: "United Kingdom",
    communication: "indirect_humorous",
    hierarchy: "traditional_medium",
    personal_relationships: "cordiality_privacy",
    time_orientation: "moderate",
    decision_making: "pragmatic_consensus",
    prominent_values: "moderation_respect_tradition",
  },
  {
    name: "China",
    communication: "indirect_careful",
    hierarchy: "very_high_hierarchy",
    personal_relationships: "guanxi",
    time_orientation: "future_long_term",
    decision_making: "slow_interpersonal_harmony",
    prominent_values:
      "group_harmony_status_order"
  },
  {
    name: "Germany",
    communication: "direct_clear",
    hierarchy: "medium_formal",
    personal_relationships: "professional_formal",
    time_orientation: "future_ordered",
    decision_making: "rule_based_rational",
    prominent_values: "precision_security_structure",
  },
  {
    name: "France",
    communication: "formal_logical",
    hierarchy: "high_hierarchy",
    personal_relationships: "conversational",
    time_orientation: "present_pride",
    decision_making: "slow_hierarchical",
    prominent_values: "individualism_logic_national_pride",
  },
  {
    name: "India",
    communication: "indirect_deferent",
    hierarchy: "very_high_hierarchy",
    personal_relationships: "extended_family",
    time_orientation: "mixed_karma_tradition",
    decision_making: "hierarchical_relational",
    prominent_values: "spirituality_education_respect",
  },
  {
    name: "Indonesia",
    communication: "indirect_polite",
    hierarchy: "high_hierarchy",
    personal_relationships: "hospitality_harmony",
    time_orientation: "flexible",
    decision_making: "centralized_slow",
    prominent_values: "respect_tradition_community",
  },
  {
    name: "Korea",
    communication: "indirect_very_formal",
    hierarchy: "very_high_hierarchy",
    personal_relationships: "group_before_individual",
    time_orientation: "past_present",
    decision_making: "hierarchical_ritualized",
    prominent_values: "cooperation_respect_tradition",
  },
  {
    name: "Malaysia",
    communication: "indirect_harmonious",
    hierarchy: "high_hierarchy",
    personal_relationships: "hospitality_respect",
    time_orientation: "flexible_polychronic",
    decision_making: "collective_relational",
    prominent_values: "multiculturalism_religion_education",
  },
  {
    name: "Mexico",
    communication: "indirect_cordial",
    hierarchy: "high_hierarchy",
    personal_relationships: "friendship_extended_family",
    time_orientation: "present_tradition",
    decision_making: "relationship_based",
    prominent_values: "family_harmony_religion",
  },
  {
    name: "Netherlands",
    communication: "direct_pragmatic",
    hierarchy: "egalitarian",
    personal_relationships: "cordial_reserved",
    time_orientation: "planning_oriented",
    decision_making: "consensus_overleg",
    prominent_values: "pragmatism_frugality_openness",
  },
  {
    name: "Russia",
    communication: "direct_emotional",
    hierarchy: "high_hierarchy",
    personal_relationships: "loyalty_family_friends",
    time_orientation: "past_stability",
    decision_making: "centralized_cautious",
    prominent_values: "resistance_pride_russian_soul",
  },

]
