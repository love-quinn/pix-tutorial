'use server';

import { cookies } from 'next/headers';

// Simulated environment variables (replace with actual env setup)
const ABACATE_PAY_API_URL = process.env.NEXT_PUBLIC_ABACATE_PAY_API_URL || 'https://api.abacatepay.com/v1';
const ABACATE_PAY_TOKEN = process.env.NEXT_PUBLIC_ABACATE_API_KEY || '';

interface Product {
  externalId: string;
  name: string;
  description: string;
  quantity: number;
  price: number; // in cents
}

interface BillingResponse {
  error: null | string;
  data: {
    id: string;
    products: Array<{
      id: string;
      externalId: string;
      quantity: number;
    }>;
    amount: number;
    status: string;
    devMode: boolean;
    methods: string[];
    url: string;
    customer?: {
      id: string;
      metadata: {
        name?: string;
        cellphone?: string;
        taxId?: string;
        email?: string;
      };
    };
  };
}

export async function createPixPayment(product: Product) {
  try {
    // Validate product details
    if (product.price < 100) {
      throw new Error('Minimum price must be at least R$1.00');
    }

    // Prepare request body
    const body = JSON.stringify({
      frequency: 'ONE_TIME',
      methods: ['PIX'],
      products: [product],
      returnUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      completionUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/confirmacao`,
      customer: {
        name: 'Lucas Santana',
        email: 'lucaslucal75@gmail.com',
        cellphone: '+5511932888434',
        taxId: '473.417.478-46'
      }
    });

    // console.log(body);

    // Make API request
    const response = await fetch(`${ABACATE_PAY_API_URL}/billing/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ABACATE_PAY_TOKEN}`,
        'Accept': 'application/json'
      },
      body
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Payment creation failed: ${errorText}`);
    }

    const data: BillingResponse = await response.json();

    // Store billing ID in cookies for later reference
    const cookieStore = await cookies();
    await cookieStore.set('abacate_billing_id', data.data.id, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production' 
    });

    console.log(data);

    return data;
  } catch (error) {
    console.error('Pix Payment Creation Error:', error);
    throw error;
  }
}
