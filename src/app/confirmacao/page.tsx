"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { checkPaymentStatus } from "../actions/check-payment-status";
import Header from "../components/Header";

export default function ConfirmacaoPage() {
    const [status, setStatus] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [billingId, setBillingId] = useState<string>("");
    const router = useRouter();

    const fetchPaymentStatus = async () => {
        try {
            const paymentStatus = await checkPaymentStatus(billingId);
            setStatus(paymentStatus.status);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        }
    };

    useEffect(() => {
        if (billingId) {
            fetchPaymentStatus();

            // Set up polling for pending status
            const pollInterval = setInterval(() => {
                if (status === "PENDING") {
                    fetchPaymentStatus();
                } else {
                    clearInterval(pollInterval);
                }
            }, 5000); // Poll every 5 seconds

            // Clean up interval on component unmount
            return () => clearInterval(pollInterval);
        }
    }, [billingId, status]);

    const getStatusMessage = () => {
        switch (status) {
            case "PENDING":
                return "Pagamento pendente. Por favor, finalize o pagamento.";
            case "PAID":
                return "Pagamento confirmado! Obrigado.";
            case "CANCELED":
                return "Pagamento cancelado.";
            case "EXPIRED":
                return "Pagamento expirado.";
            default:
                return "Verificando status do pagamento...";
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case "PENDING":
                return "text-yellow-500";
            case "PAID":
                return "text-green-500";
            case "CANCELED":
            case "EXPIRED":
                return "text-red-500";
            default:
                return "text-gray-100";
        }
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <strong className="font-bold">Erro: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center">
                <div className="bg-gray-800 p-8 rounded-xl shadow-2xl text-center w-96">
                    <h1
                        className={`text-3xl font-bold mb-4 ${getStatusColor()}`}
                    >
                        Status do Pagamento
                    </h1>

                    {!status && (
                        <div className="mb-4">
                            <input
                                type="text"
                                value={billingId}
                                onChange={(e) => setBillingId(e.target.value)}
                                placeholder="Digite o ID do pagamento"
                                className="w-full px-3 py-2 bg-gray-700 text-white rounded"
                            />
                            <button
                                onClick={fetchPaymentStatus}
                                disabled={!billingId}
                                className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-500"
                            >
                                Verificar Status
                            </button>
                        </div>
                    )}

                    {status && (
                        <>
                            <p className={`text-xl ${getStatusColor()}`}>
                                {getStatusMessage()}
                            </p>
                            {status === "PAID" && (
                                <button
                                    onClick={() => router.push("/")}
                                    className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                                >
                                    Voltar para a Loja
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
