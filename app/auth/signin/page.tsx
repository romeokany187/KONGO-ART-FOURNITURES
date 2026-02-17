"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signIn("google", {
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        console.error("Sign in error:", result.error);
      } else if (result?.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-primary-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            KONGO ART <span className="text-green-primary-600">FOURNITURES</span>
          </h1>
          <p className="text-gray-600">Connectez-vous à votre compte</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-green-primary-600 text-green-primary-600 py-3 px-6 rounded-lg font-semibold hover:bg-green-primary-50 transition disabled:opacity-50"
          >
            <Image
              src="https://www.gstatic.com/firebaseapp/v8.10.0/images/google.svg"
              alt="Google"
              width={20}
              height={20}
            />
            {isLoading ? "Connexion en cours..." : "Se connecter avec Google"}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          {/* Info Text */}
          <div className="text-center space-y-4">
            <p className="text-gray-600 text-sm">
              Bienvenue sur KONGO ART FOURNITURES
            </p>
            <div className="bg-green-primary-50 rounded-lg p-4">
              <p className="text-green-primary-700 text-sm font-semibold mb-2">
                Fonctionnalités sécurisées:
              </p>
              <ul className="text-left text-sm text-green-primary-600 space-y-1">
                <li>✅ Authentification Google OAuth</li>
                <li>✅ Deux facteurs d'authentification</li>
                <li>✅ Accès sécurisé à votre profil</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          En vous connectant, vous acceptez nos conditions d'utilisation
        </p>
      </div>
    </main>
  );
}
