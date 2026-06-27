import { ImageResponse } from 'next/og';
import archetypesData from '../../../../content/archetypes.json';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const archetypeId = searchParams.get('archetype');

    const fontData = await fetch(
      'https://github.com/google/fonts/raw/main/ofl/kanit/Kanit-Regular.ttf'
    ).then((res) => res.arrayBuffer());

    if (!archetypeId) {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0F172A', 
              color: '#F8FAFC',
              fontFamily: '"Kanit"',
              padding: '40px',
              textAlign: 'center',
              border: '20px solid #8B5CF6'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ fontSize: '100px', fontWeight: 'bold', color: '#F8FAFC', textTransform: 'uppercase', marginBottom: '10px' }}>
                  READER DNA
                </h1>
                <div style={{ fontSize: '40px', color: '#10B981', fontStyle: 'italic', marginBottom: '50px' }}>
                  แบบทดสอบ 24 ข้อ คุณเป็นนักอ่านแบบไหน?
                </div>
                <div style={{ fontSize: '32px', color: '#94A3B8', border: '4px solid #8B5CF6', padding: '16px 32px', borderRadius: '24px' }}>
                  SUNDAY-BOOK.CLUB
                </div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
          fonts: [{ name: 'Kanit', data: fontData, style: 'normal' }]
        }
      );
    }

    const archetype = archetypesData.archetypes.find((a) => a.id === archetypeId);

    if (!archetype) {
      return new Response('Archetype not found', { status: 404 });
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0F172A',
            color: '#F8FAFC',
            fontFamily: '"Kanit"',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '32px', color: '#94A3B8', marginBottom: '20px' }}>
            Reader DNA ของฉันคือ
          </h3>
          <h1 style={{ fontSize: '72px', color: '#8B5CF6', marginBottom: '10px' }}>
            {archetype.thai_name}
          </h1>
          <h2 style={{ fontSize: '36px', fontWeight: 'normal', fontStyle: 'italic', color: '#10B981', marginBottom: '40px' }}>
            "{archetype.share_card.tagline}"
          </h2>
          <p style={{ fontSize: '28px', color: '#F8FAFC', padding: '0 40px', opacity: 0.9 }}>
            {archetype.share_card.punchline}
          </p>
          <div style={{ marginTop: '50px', fontSize: '24px', color: '#94A3B8', padding: '12px 24px', border: '2px solid #8B5CF6', borderRadius: '16px' }}>
            เล่นแบบทดสอบเลยที่ sunday-book.club
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Kanit',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
