import { useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { destinationIconMap, destinations } from "@/data/destinations";
import { Calendar, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

const DestinationsPage = () => {
  const [activeSlug, setActiveSlug] = useState(destinations[0]?.slug ?? "");
  const activeDestination = useMemo(
    () => destinations.find((d) => d.slug === activeSlug) ?? destinations[0],
    [activeSlug]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-24 pb-20">
        {/* Category Tabs */}
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl font-semibold sm:text-3xl">Choose a destination</h1>
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto py-2">
            {destinations.map((d) => {
              const Icon = destinationIconMap[d.icon];
              const active = d.slug === activeSlug;
              return (
                <button
                  key={d.slug}
                  onClick={() => setActiveSlug(d.slug)}
                  className={[
                    "shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background/80 text-foreground border-border hover:bg-accent/40",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                  {d.name}
                </button>
              );
            })}
          </div>
        </section>

        {/* Listing header */}
        <section className="container mx-auto px-4 mt-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tours in {activeDestination.name}
          </h2>
          <p className="mt-2 text-muted-foreground">
            Handpicked experiences with transparent pricing and honest ratings.
          </p>
        </section>

        {/* Packages grid */}
        <section className="container mx-auto px-4 mt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeDestination.packages.map((pkg) => (
              <Card
                key={pkg.name}
                className="group overflow-hidden border border-border/70 bg-card/80 backdrop-blur rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
              >
                {pkg.image && (
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground shadow">
                      <Calendar className="h-3.5 w-3.5" /> {pkg.duration}
                    </span>
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-white shadow">
                      <Star className="h-3.5 w-3.5 fill-white" /> {pkg.rating}
                    </span>
                  </div>
                )}

                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold leading-snug">
                    {pkg.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {activeDestination.region}
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">
                    {pkg.description}
                  </p>

                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div>
                      {pkg.oldPrice && (
                        <p className="text-xs text-muted-foreground line-through">{pkg.oldPrice}</p>
                      )}
                      <p className="text-xl font-semibold text-primary">{pkg.price} <span className="text-xs font-normal text-muted-foreground">/ adult</span></p>
                    </div>

                    <Button asChild variant="outline" className="whitespace-nowrap">
                      <Link to={`/destinations/${activeDestination.slug}`}>View details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DestinationsPage;
