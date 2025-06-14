import { NextRequest, NextResponse } from 'next/server';
import { avalancheFuji } from 'viem/chains';
import { createMetadata, Metadata, ValidatedMetadata, ExecutionResponse } from '@sherrylinks/sdk';
import { serialize } from 'wagmi';
import { encodeFunctionData, TransactionSerializable } from 'viem';
import { abi } from './abi';


const CONTRACT_ADDRESS = '0xaF78Ce0A625F0Be536BdEFf3E0024F1Da087e52b';


export async function GET(req: NextRequest) {
  try {
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const serverUrl = `${protocol}://${host}`;

    const metadata: Metadata = {
      url: 'https://sherry.social',
      icon: 'https://mascolombia.com/wp-content/uploads/2024/06/prueba-pedagogica-del-concurso-docente-2024.jpg',
      title: 'Educational Support Program',
      baseUrl: serverUrl,
      description: 'Qualify and participate in an educational support program to enhance your skills and career prospects - Smart Contract on Avalanche and Ethereum',
      actions: [
        {
          type: 'dynamic',
          label: 'Educational Support Program',
          description: 'Fill out the form to qualify for the educational support program',
          chains: { source: 'fuji' },
          path: `/api/foundDirect`,
          params: [
            {
              name: 'monthlysalary',
              label: 'Your Monthly Salary (USD)',
              type: 'number',
              min: 0,
              max: 10000,
              required: true,
            },
            {
              name: 'monthlyexpenses',
              label: 'Your Monthly Expenses (USD)',//5
              type: 'number',
              min: 0,
              max: 10000,
              required: true,
            },
            {
              name: 'debts',
              label: 'Do you have any active debts?',//5
              type: 'radio',
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
              required: true,
            },
            {
              name: 'educationlevel',//4
              label: 'Your Education Level',
              type: 'select',
              options: [
                { label: 'High School', value: 'highschool' },
                { label: 'Bachelor\'s Degree', value: 'bachelor' },
                { label: 'Master\'s Degree', value: 'master' },
                { label: 'PhD', value: 'phd' },
              ],
              required: true,
            },
            {
              name: 'availability',
              label: 'Your Availability for Program Activities',//4
              type: 'select',
              options: [
                { label: 'Morning', value: 'morning' },
                { label: 'Afternoon', value: 'afternoon' },
                { label: 'Evening', value: 'evening' },
                { label: 'Weekends', value: 'weekends' },
                { label: 'Full-time', value: 'fulltime' },
              ],
              required: true,
            },
            {
              name: 'dependents',
              label: 'How many people depend on you financially?',//5
              type: 'number',
              min: 0,
              max: 10,
              required: true,
            },
            {
              name: 'searchduration',
              label: 'How long have you been looking for educational opportunities?',//3
              type: 'select',
              options: [
                { label: 'Less than 1 month', value: 'less_than_1_month' },
                { label: '1–3 months', value: '1_to_3_months' },
                { label: '3–6 months', value: '3_to_6_months' },
                { label: 'More than 6 months', value: 'more_than_6_months' },
              ],
              required: true,
            },
            {
              name: 'programimpact',
              label: 'How much do you think this program can improve your future?',//3
              type: 'radio',
              options: [
                { label: '1 - Not at all', value: '1' },
                { label: '2 - A little', value: '2' },
                { label: '3 - Moderately', value: '3' },
                { label: '4 - Very much', value: '4' },
                { label: '5 - Extremely', value: '5' },
              ],
              required: true,
            },
            {
              name: 'commitmentlevel',
              label: 'How committed are you to completing the program?',//5
              type: 'select',
              options: [
                { label: '1 - Not committed', value: '1' },
                { label: '2 - Slightly committed', value: '2' },
                { label: '3 - Moderately committed', value: '3' },
                { label: '4 - Very committed', value: '4' },
                { label: '5 - Extremely committed', value: '5' },
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
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create metadata' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const monthlysalary = searchParams.get('monthlysalary');
    const monthlyexpenses = searchParams.get('monthlyexpenses');
    const debts = searchParams.get('debts');
    const educationlevel = searchParams.get('educationlevel');
    const availability = searchParams.get('availability');
    const dependents = searchParams.get('dependents');
    const searchduration = searchParams.get('searchduration');
    const programimpact = searchParams.get('programimpact');
    const commitmentlevel = searchParams.get('commitmentlevel');


    if (!monthlysalary || !monthlyexpenses || !debts || !educationlevel || !availability ||
       !dependents || !searchduration || !programimpact || !commitmentlevel) {
      return NextResponse.json(
        { error: 'Required parameter missing' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        },
      );
    }

    // Custom business logic
    //const optimizedTimestamp = calculateOptimizedTimestamp(message);

    const score = getScore(parseInt(monthlysalary), parseInt(monthlyexpenses), debts, educationlevel, availability,
      parseInt(dependents), searchduration, programimpact, commitmentlevel);

    
    if(score < 60){
      return NextResponse.json(
        { error: 'You do not qualify for the program. Your score is too low.' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        },
      );
    }

    // Encode the contract function data
    const data = encodeFunctionData({
      abi: abi,
      functionName: 'enterConcert',
      args: [],
    });

    const valueFee = 0.05 * 1e18; // 0.05 AVAX in wei (assuming 18 decimals for AVAX)

    // Create smart contract transaction
    const tx: TransactionSerializable = {
      to: CONTRACT_ADDRESS,
      data: data,
      value: BigInt(valueFee), // 0.05 AVAX in wei
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
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Error in POST request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
    },
  });
}

function getScore(monthlysalary: number, monthlyexpenses: number, debts: string,
  educationlevel: string, availability: string, dependents: number,
  searchduration: string, programimpact: string, commitmentlevel: string): number {
  let score = 0;

  //score += monthlysalary / 1000; // Normalize salary
  //score -= monthlyexpenses / 1000; // Normalize expenses
  score = ((monthlyexpenses > monthlysalary) ? 20 : 10) * 5; 
  score += ((debts === 'yes' ? 20 : 10)) * 5; 
  score += (educationlevel === 'highschool' ? 20 :
           educationlevel === 'bachelor' ? 15 :
           educationlevel === 'master' ? 10 : 5) * 4; // Score based on education level
  score += (availability === 'fulltime' ? 20 : availability === 'weekends' ? 10 : 15) * 4; // Score based on availability
  score += (dependents * 2) * 5; // Score based on dependents
  score += (searchduration === 'less_than_1_month' ? 5 :
           searchduration === '1_to_3_months' ? 10 :
           searchduration === '3_to_6_months' ? 15 : 20) * 3; // Score based on search duration
  score += (parseInt(programimpact) * 4) * 3; // Score based on program impact
  score += (parseInt(commitmentlevel) * 4) * 5; // Score based on commitment level
  //return Math.max(0, Math.min(score, 100)); // Ensure score is between 0 and 100

  return (score / 680) * 100; // Normalize score to a percentage (0-100) - 27.5 

}
