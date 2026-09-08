import { useEffect, useRef, useState } from "react";
import { pinterestPins } from "../data/pinterestPins";
import { pinterestPalettes } from "../data/pinterestPalettes";
import { products } from "../data/products";

declare global {
  interface Window {
    Pinterest?: {
      process?: () => void;
    };
  }
}

function PinterestGallery() {
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  const selectedDesignRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://assets.pinterest.com/js/pinit.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.Pinterest?.process?.();
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!selectedPin) {
      return;
    }

    const scrollTimer = window.setTimeout(() => {
      selectedDesignRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);

    return () => {
      window.clearTimeout(scrollTimer);
    };
  }, [selectedPin]);

  const selectedPalette = selectedPin
    ? pinterestPalettes[selectedPin] ?? []
    : [];

  const firstPin = pinterestPins[0];

  const selectedProducts =
    selectedPin === firstPin ? products : [];

  const handleSelect = (pin: string) => {
    setSelectedPin(pin);
  };

  return (
    <section className="pinterest-gallery">
      <div className="pins-grid">
        {pinterestPins.map((pin) => {
          const isSelected = selectedPin === pin;

          return (
            <article
              key={pin}
              className={`pin-card ${isSelected ? "selected" : ""}`}
            >
              <div className="pin-card-header">
                <button
                  type="button"
                  className={`select-button ${
                    isSelected ? "selected-button" : ""
                  }`}
                  onClick={() => handleSelect(pin)}
                >
                  {isSelected ? (
                    <>
                      <span className="check-icon">✓</span>
                      Selected
                    </>
                  ) : (
                    "Select Design"
                  )}
                </button>
              </div>

              <div className="pin-content">
                <a
                  data-pin-do="embedPin"
                  href={pin}
                ></a>
              </div>
            </article>
          );
        })}
      </div>

      {selectedPin && (
        <section
          ref={selectedDesignRef}
          className="selected-design"
        >
          <div className="selected-design-details">
            {/* Color Palette */}
            <div className="palette-card">
              <div className="palette-header">
                <p className="palette-eyebrow">
                  COLOR DIRECTION
                </p>

                <h3>Your Color Palette</h3>

                <p>
                  A curated selection of tones inspired by your
                  chosen interior.
                </p>
              </div>

              {selectedPalette.length > 0 ? (
                <>
                  <div className="palette-preview">
                    {selectedPalette.map((color) => (
                      <div
                        key={color}
                        className="color-swatch"
                        style={{
                          backgroundColor: color,
                        }}
                        title={color}
                      >
                        <span>{color}</span>
                      </div>
                    ))}
                  </div>

                  <div className="palette-colors">
                    {selectedPalette.map((color, index) => (
                      <div
                        className="palette-color-item"
                        key={color}
                      >
                        <div
                          className="palette-color-circle"
                          style={{
                            backgroundColor: color,
                          }}
                        />

                        <div className="palette-color-info">
                          <span>Color {index + 1}</span>
                          <strong>{color}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="palette-empty">
                  No color palette is defined for this image yet.
                </div>
              )}
            </div>

            {/* Products */}
            <div className="products-card">
              <div className="products-header">
                <p className="products-eyebrow">
                  SHOP THE LOOK
                </p>

                <div className="products-title-row">
                  <div>
                    <h3>Products from this design</h3>

                    <p>
                      Discover the pieces that complete this look.
                    </p>
                  </div>

                  {selectedProducts.length > 0 && (
                    <span className="products-count">
                      {selectedProducts.length} items
                    </span>
                  )}
                </div>
              </div>

              {selectedProducts.length > 0 ? (
                <div className="products-list">
                  {selectedProducts.map((product) => (
                    <article
                      key={product.id}
                      className="product-row"
                    >
                      <div className="product-image">
                        <img
                          src={product.image}
                          alt={product.name}
                        />
                      </div>

                      <div className="product-info">
                        <p>Interior piece</p>

                        <h4>{product.name}</h4>
                      </div>

                      <a
                        href={product.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="product-button"
                      >
                        View product ↗
                      </a>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="products-empty">
                  <div>
                    <p>No products yet</p>

                    <span>
                      Products for this design will appear here.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </section>
  );
}

export default PinterestGallery;