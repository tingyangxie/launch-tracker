"use client";

import { useEffect, useState } from "react";
import { ReleaseForm } from "@/components/releases/release-form";
import { supabase } from "@/lib/supabase/client";
import type { Product } from "@/lib/supabase/types";

export default function NewReleasePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("name");
      if (data) setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="lt-technical-label">Releases</p>
        <h1 className="lt-page-title">Add New Release</h1>
      </div>
      <ReleaseForm products={products} />
    </div>
  );
}
