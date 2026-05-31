import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { PAINTS_AND_LACQUERS, Product } from "@/lib/siteData";
import Navbar from "@/components/Navbar";

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [tab, setTab] = useState<"desc" | "features" | "rec">("desc");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-brand-navy rounded-t-2xl p-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-brand-accent text-xs font-medium uppercase tracking-widest mb-1">Краски и лаки</p>
            <h2 className="font-oswald text-xl font-bold text-white leading-tight">{product.name}</h2>
            <span className="inline-block mt-2 text-white/60 text-sm">{product.weight}</span>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors shrink-0 mt-1">
            <Icon name="X" size={22} />
          </button>
        </div>

        <div className="flex border-b border-gray-100">
          {(["desc", "features", "rec"] as const).map((t) => {
            const labels = { desc: "Описание", features: "Характеристики", rec: "Рекомендации" };
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  tab === t ? "text-brand-navy border-b-2 border-brand-accent" : "text-muted-foreground hover:text-brand-navy"
                }`}
              >
                {labels[t]}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {tab === "desc" && (
            <div>
              <div className="mb-4">
                <p className="font-semibold text-brand-navy mb-1">Совместимость</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{product.compatibility}</p>
              </div>
              {product.fullDesc.split("\n\n").map((para, i) => (
                <p key={i} className="text-sm text-foreground leading-relaxed mb-3">{para}</p>
              ))}
            </div>
          )}

          {tab === "features" && (
            <ul className="space-y-2">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <Icon name="CheckCircle" size={16} className="text-brand-accent shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          )}

          {tab === "rec" && (
            <ul className="space-y-3">
              {product.recommendations.map((r, i) => (
                <li key={i} className={`flex items-start gap-3 text-sm leading-relaxed ${r.startsWith("ВНИМАНИЕ") ? "text-red-600 font-medium" : "text-foreground"}`}>
                  <Icon name={r.startsWith("ВНИМАНИЕ") ? "AlertTriangle" : "Info"} size={16} className={`shrink-0 mt-0.5 ${r.startsWith("ВНИМАНИЕ") ? "text-red-500" : "text-brand-cyan"}`} />
                  {r}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-6 pt-0">
          <button
            onClick={() => {
              onClose();
              document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full btn-glow bg-brand-accent text-brand-navy font-oswald font-bold py-4 rounded-xl uppercase tracking-wide text-sm"
          >
            Запросить цену
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <div
      className="card-hover group bg-white rounded-2xl border border-brand-navy/8 overflow-hidden cursor-pointer flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-44 flex items-end p-5" style={{ background: "linear-gradient(135deg, #1A3A7C 0%, #0B1120 100%)" }}>
        <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
          <Icon name="Layers" size={22} className="text-brand-accent" />
        </div>
        <div>
          <span className="text-brand-accent/80 text-xs font-medium uppercase tracking-wider">Офсетная краска</span>
          <h3 className="font-oswald text-lg font-bold text-white mt-1 leading-tight">{product.name}</h3>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-brand-navy/8 text-brand-navy text-xs font-medium px-2.5 py-1 rounded-full">{product.weight}</span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1">{product.shortDesc}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-brand-cyan text-xs font-medium flex items-center gap-1">
            <Icon name="CheckCircle" size={13} />
            {product.features.length} характеристик
          </span>
          <div className="w-8 h-8 rounded-full bg-brand-navy/5 group-hover:bg-brand-accent flex items-center justify-center transition-colors">
            <Icon name="ArrowRight" size={15} className="text-brand-navy" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaintsAndLacquers() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Product | null>(null);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar onScrollTo={() => { navigate("/"); }} />

      {/* HERO */}
      <section className="bg-brand-navy noise pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <button
            onClick={() => navigate("/#catalog")}
            className="flex items-center gap-2 text-white/50 hover:text-brand-accent transition-colors text-sm mb-8"
          >
            <Icon name="ChevronLeft" size={16} />
            Назад в каталог
          </button>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/15 flex items-center justify-center">
                  <Icon name="Layers" size={20} className="text-brand-accent" />
                </div>
                <span className="text-brand-accent text-sm font-medium uppercase tracking-widest">Каталог</span>
              </div>
              <h1 className="font-oswald text-4xl sm:text-5xl font-bold text-white">
                КРАСКИ И ЛАКИ
              </h1>
              <p className="text-white/60 mt-3 max-w-md">
                Офсетная листовая краска, ВД лаки, УФ лаки — {PAINTS_AND_LACQUERS.length} {PAINTS_AND_LACQUERS.length === 1 ? "позиция" : "позиции"} в наличии
              </p>
            </div>
            <button
              onClick={() => { navigate("/"); setTimeout(() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" }), 300); }}
              className="btn-glow flex items-center gap-2 bg-brand-accent text-brand-navy font-oswald font-bold px-6 py-3 rounded-xl uppercase tracking-wide text-sm shrink-0"
            >
              <Icon name="MessageCircle" size={16} />
              Запросить цену
            </button>
          </div>
        </div>
      </section>

      {/* ТОВАРЫ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {PAINTS_AND_LACQUERS.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <Icon name="Package" size={48} className="mx-auto mb-4 opacity-30" />
              <p>Товары в этом разделе скоро появятся</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PAINTS_AND_LACQUERS.map((product) => (
                <ProductCard key={product.id} product={product} onClick={() => setSelected(product)} />
              ))}
            </div>
          )}

          <div className="mt-12 bg-brand-navy/5 border border-brand-navy/10 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/15 flex items-center justify-center shrink-0">
                <Icon name="HelpCircle" size={22} className="text-brand-accent" />
              </div>
              <div>
                <p className="font-semibold text-brand-navy">Не нашли нужную позицию?</p>
                <p className="text-muted-foreground text-sm">Запросите любой товар — подберём и рассчитаем цену</p>
              </div>
            </div>
            <button
              onClick={() => { navigate("/"); setTimeout(() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" }), 300); }}
              className="btn-glow flex items-center gap-2 bg-brand-navy text-white font-oswald font-semibold px-6 py-3 rounded-xl uppercase tracking-wide text-sm shrink-0"
            >
              <Icon name="Send" size={15} />
              Оставить заявку
            </button>
          </div>
        </div>
      </section>

      {/* BACK TO TOP */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-11 h-11 rounded-full bg-brand-navy text-white shadow-lg hover:bg-brand-blue transition-colors flex items-center justify-center z-40"
      >
        <Icon name="ArrowUp" size={18} />
      </button>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
