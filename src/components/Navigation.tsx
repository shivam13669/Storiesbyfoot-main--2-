import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const navItems = [
  { name: "Destinations", to: "/destinations", type: "route" as const },
  { name: "Services", to: "#services", type: "hash" as const },
  { name: "About", to: "#about", type: "hash" as const },
  { name: "Contact", to: "#contact", type: "hash" as const },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10 text-white shadow-lg">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 min-w-0">
            <img src="https://cdn.builder.io/api/v1/image/assets%2Fde743b16560c4ea5a4a46e65a2543876%2F4be0568d99d2469baa7ef6c274a8a1b2?format=webp&width=800" alt="StoriesByFoot logo" className="h-9 w-auto sm:h-10" />
            <span className="text-base sm:text-lg md:text-xl font-bold leading-tight text-white">
              StoriesBy<span className="text-secondary">Foot</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const classes = "text-white/90 hover:text-white transition-colors font-medium relative group";

              if (item.type === "route") {
                return (
                  <Link key={item.name} to={item.to} className={classes}>
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                );
              }

              return (
                <a key={item.name} href={item.to} className={classes}>
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button variant="hero" size="default">
              Start Adventure
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900/95 border border-white/10 backdrop-blur-lg rounded-lg mt-2 shadow-lg">
              {navItems.map((item) => {
                const classes = "block px-3 py-2 text-base font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors";

                if (item.type === "route") {
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={classes}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                }

                return (
                  <a
                    key={item.name}
                    href={item.to}
                    className={classes}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                );
              })}
              <div className="px-3 py-2">
                <Button variant="hero" size="default" className="w-full">
                  Start Adventure
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
