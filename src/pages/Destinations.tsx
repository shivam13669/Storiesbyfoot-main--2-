import { useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { destinationIconMap, destinations } from "@/data/destinations";
import { ArrowRight, Calendar, MapPin, MapPinned, Star } from "lucide-react";
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
        {/* Hero */}
        <section className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <MapPinned className="h-4 w-4" />
              Explore destinations crafted for storytellers
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Curated journeys across the Himalayas
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose from high-altitude odysseys, monastery circuits, rainforest trails, and cultural immersions designed by our expedition experts.
            </p>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="container mx-auto px-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">Explore</span>
              <h2 className="mt-1 text-3xl font-semibold">Pick a region to uncover handpicked tours</h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Switch between regions to preview signature expeditions, price drops, and ratings in one glance.
              </p>
            </div>
            <Link to="/destinations" className="flex items-center gap-2 text-sm font-semibold text-primary">
              View all destinations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
            {destinations.map((d) => {
              const Icon = destinationIconMap[d.icon];
              const active = d.slug === activeSlug;
              return (
                <button
                  key={d.slug}
                  onClick={() => setActiveSlug(d.slug)}
                  className={[
                    "group flex min-w-[180px] items-center gap-3 rounded-full border px-5 py-3 text-sm font-medium transition-all",
                    active
                      ? "border-primary/40 bg-primary text-primary-foreground shadow"
                      : "border-border/60 bg-muted/60 text-muted-foreground hover:border-primary/30 hover:bg-primary/10 hover:text-primary",
                  ].join(" ")}
                >
                  <span className="rounded-full bg-white/20 p-2 text-current transition-colors group-hover:bg-white/30">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="text-left">
                    <span className="block text-sm font-semibold">{d.name}</span>
                    <span className="text-xs text-muted-foreground">{d.tagline}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Listing header */}
        <section className="container mx-auto px-4 mt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Tours in {activeDestination.name}</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{activeDestination.summary}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
              <span className="rounded-full bg-muted px-3 py-1">Best time: {activeDestination.quickFacts.bestTime}</span>
              <span className="rounded-full bg-muted px-3 py-1">Start point: {activeDestination.quickFacts.startPoint}</span>
              <span className="rounded-full bg-muted px-3 py-1">Style: {activeDestination.quickFacts.travelStyle}</span>
            </div>
          </div>
        </section>

        {/* Packages grid */}
        <section className="container mx-auto px-4 mt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeDestination.packages.map((pkg) => (
              <Card
                key={pkg.name}
                className="group flex h-full flex-col overflow-hidden border border-border/60 bg-card/90 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
              >
                {pkg.image && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground shadow">
                      <Calendar className="h-3.5 w-3.5" /> {pkg.duration}
                    </span>
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-white shadow">
                      <Star className="h-3.5 w-3.5 fill-white" /> {pkg.rating.toFixed ? pkg.rating.toFixed(1) : pkg.rating}
                      <span className="text-white/80">({pkg.reviews})</span>
                    </span>
                  </div>
                )}

                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{pkg.duration}</p>
                      <h3 className="mt-1 text-lg font-semibold leading-snug">{pkg.name}</h3>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{pkg.rating.toFixed ? pkg.rating.toFixed(1) : pkg.rating}</span>
                      <span className="text-muted-foreground">({pkg.reviews})</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {activeDestination.region}
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">{pkg.description}</p>

                  <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-semibold text-foreground">{pkg.price}</span>
                      {pkg.oldPrice && (
                        <span className="text-sm text-muted-foreground line-through">{pkg.oldPrice}</span>
                      )}
                      {pkg.badge && (
                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">{pkg.badge}</span>
                      )}
                    </div>

                    <div className="flex w-full gap-2 sm:w-auto">
                      <Button asChild variant="secondary" className="flex-1 sm:flex-none">
                        <Link to={`/destinations/${activeDestination.slug}`} state={{ focusPackage: pkg.name }}>
                          View itinerary
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" className="flex-1 sm:flex-none">Request callback</Button>
                    </div>
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
