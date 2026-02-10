import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, workEmail, organisationName, organisationType, collaborationType } = body
    
    if (!name || !workEmail || !organisationName || !organisationType || !collaborationType) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Here you would typically save to a database
    // For now, we'll just return success
    console.log('Partner submission:', body)

    return NextResponse.json(
      { 
        message: 'Successfully submitted partnership request!',
        data: body 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Partner submission error:', error)
    return NextResponse.json(
      { message: 'Failed to process request' },
      { status: 500 }
    )
  }
}
