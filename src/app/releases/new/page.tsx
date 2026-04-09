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
      <h1 className="text-2xl font-bold">Add New Release</h1>
      <ReleaseForm products={products} />
    </div>
  );
}
