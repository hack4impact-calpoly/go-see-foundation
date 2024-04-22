"use client";
import Script from "next/script";
import React, { useEffect, useState } from "react";

function DonateButtonComponent() {
  const [stripeLoaded, setStripeLoaded] = useState(false);

  const public_key = process.env.NEXT_STRIPE_PUBLIC_KEY;
  useEffect(() => {
    const loadStripeScript = async () => {
      try {
        // Load the Stripe script dynamically
        const stripeScript = document.createElement("script");
        stripeScript.src = "https://js.stripe.com/v3/";
        stripeScript.async = true;
        stripeScript.onload = () => setStripeLoaded(true);
        document.head.appendChild(stripeScript);
      } catch (error) {
        console.error("Error loading Stripe script:", error);
      }
    };

    loadStripeScript();
  }, []);

  if (!stripeLoaded) {
    return <div style={{ textAlign: "center" }}>Loading Stripe...</div>;
  }

  // id and pk are fine to expose to clients
  return (
    <div style={{ textAlign: "center" }}>
      <Script async src="https://js.stripe.com/v3/buy-button.js" />
      {/* @ts-ignore */}
      <stripe-buy-button
        buy-button-id={"buy_btn_1P6LEpCGxfvlQEMzrvEj22jp"}
        publishable-key={
          "pk_test_51MI1s7CGxfvlQEMz92h8Ro1tCKbBTE5dnU8j460Ct8OAi2JwonIJuvhWKuu8vlnt29CQ3r3AxJf7x9KP0xg658mP00SbLGKLEF"
        }
      />
    </div>
  );
}

export default DonateButtonComponent;
