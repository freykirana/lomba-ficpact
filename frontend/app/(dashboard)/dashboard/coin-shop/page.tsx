"use client";

import { useState, useEffect } from "react";
import { CircleDollarSign, Loader2, CheckCircle2, ShoppingCart } from "lucide-react";
import { shopAPI } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: string;
}

export default function CoinShopPage() {
  const { user, refreshUser } = useAuth();
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    shopAPI
      .list()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const handlePurchase = async (item: ShopItem) => {
    if (!user || user.coins < item.price) {
      setErrorMsg("Insufficient coins!");
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }

    setPurchasing(item.id);
    setErrorMsg(null);
    try {
      await shopAPI.purchase(item.id);
      setSuccessMsg(`Successfully purchased "${item.name}"!`);
      await refreshUser();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Purchase failed");
      setTimeout(() => setErrorMsg(null), 3000);
    } finally {
      setPurchasing(null);
    }
  };

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const cat = item.category || "OTHER";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, ShopItem[]>);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Coin Shop</h1>
          <p className="text-gray-600">Spend your mystery coins on power-ups and rewards.</p>
        </div>
        <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100 flex items-center gap-2">
          <CircleDollarSign size={24} className="text-yellow-500" />
          <span className="text-xl font-bold text-gray-900">{user?.coins.toLocaleString() ?? 0}</span>
          <span className="text-gray-400 text-sm">coins</span>
        </div>
      </div>

      {/* Status Messages */}
      {successMsg && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700 flex items-center gap-2">
          <CheckCircle2 size={18} /> {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">{errorMsg}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-gray-400" size={32} />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <ShoppingCart className="text-gray-300 mx-auto mb-4" size={48} />
          <p className="text-gray-500 font-medium">Shop is empty.</p>
          <p className="text-gray-400 text-sm mt-1">Items will appear here once they are added.</p>
        </div>
      ) : (
        Object.entries(groupedItems).map(([category, catItems]) => (
          <div key={category} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-blue-600 p-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider">{category}</h2>
            </div>
            <div className="p-6 overflow-x-auto">
              <div className="flex gap-4 min-w-max pb-4">
                {catItems.map((item) => {
                  const canAfford = (user?.coins ?? 0) >= item.price;
                  return (
                    <div key={item.id} className={`flex flex-col items-center justify-center bg-gray-100 rounded-xl p-6 min-w-35 shadow-sm ${!canAfford ? "opacity-60" : ""}`}>
                      <span className="font-bold text-gray-800 mb-1">{item.name}</span>
                      <span className="text-xs text-gray-500 mb-2 text-center max-w-[140px]">{item.description}</span>
                      <span className="flex items-center gap-1 font-bold text-gray-600 mb-3 text-sm">
                        <CircleDollarSign size={16} className="text-gray-400" /> {item.price} Coin
                      </span>
                      <button
                        onClick={() => handlePurchase(item)}
                        disabled={purchasing === item.id || !canAfford}
                        className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {purchasing === item.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : canAfford ? (
                          <>Buy &rarr;</>
                        ) : (
                          "Not enough coins"
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
