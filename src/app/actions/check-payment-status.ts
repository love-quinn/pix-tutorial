"use server";

import { cookies } from 'next/headers';

interface PaymentStatusResponse {
  error: null | string;
  data: {
    id: string;
    status: 'PENDING' | 'PAID' | 'CANCELED' | 'EXPIRED';
    amount: number;
    paidAmount?: number;
    paidAt?: string;
    methods: string[];
  };
}

export async function checkPaymentStatus(billingId?: string) {
  try {
    // If no billingId is provided, try to get it from cookies
    const cookieStore = await cookies();
    const storedBillingId = billingId || cookieStore.get('abacate_billing_id')?.value;

    if (!storedBillingId) {
      throw new Error('No billing ID found');
    }

    // Fetch payment status from Abacate Pay API
    const response = await fetch(`${process.env.NEXT_PUBLIC_ABACATE_PAY_API_URL}/bills/${storedBillingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ABACATE_API_KEY}`
      },
      cache: 'no-store' // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payment status');
    }

    const paymentStatus: PaymentStatusResponse = await response.json();

    return {
      billingId: paymentStatus.data.id,
      status: paymentStatus.data.status,
      amount: paymentStatus.data.amount,
      paidAmount: paymentStatus.data.paidAmount,
      paidAt: paymentStatus.data.paidAt
    };
  } catch (error) {
    console.error('Payment Status Check Error:', error);
    throw error;
  }
}
