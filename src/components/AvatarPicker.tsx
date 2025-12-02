"use client";

import { useState, useCallback, useEffect } from "react";
import { Avatar, generateRandomConfig, defaultConfig } from "./Avatar";
import {
  AvatarConfig,
  AvatarPickerProps,
  BACKGROUNDS,
  SKINS,
  TSHIRTS,
  EXPRESSIONS,
  HAIRS,
} from "../types";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
    fontFamily: "inherit",
  },
  controls: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  category: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    color: "#64748b",
    letterSpacing: "0.05em",
  },
  options: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
  },
  option: {
    padding: "6px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    background: "#fff",
    cursor: "pointer",
    transition: "all 0.2s ease",
    outline: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
  },
  optionHover: {
    borderColor: "#13aeff",
    background: "#f0f9ff",
  },
  optionSelected: {
    borderColor: "#13aeff",
    background: "#e0f4ff",
  },
  randomButton: {
    padding: "14px 28px",
    height: "50px",
    border: "none",
    borderTop: "1px solid rgba(255, 255, 255, 0.4)",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #13aeff 0%, #0090db 100%)",
    color: "#fff",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: 600,
    letterSpacing: "0.025em",
    transition: "all 0.15s ease",
    boxShadow: "0 6px 0 0 #0078b8",
    marginTop: "8px",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  },
};

interface CategorySelectorProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  renderOption: (option: T) => React.ReactNode;
}

function CategorySelector<T extends string>({
  label,
  options,
  value,
  onChange,
  renderOption,
}: CategorySelectorProps<T>) {
  return (
    <div style={styles.category}>
      <span style={styles.label}>{label}</span>
      <div style={styles.options}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            title={option}
            style={{
              ...styles.option,
              ...(value === option ? styles.optionSelected : {}),
            }}
            onClick={() => onChange(option)}
            onMouseEnter={(e) => {
              if (value !== option) {
                Object.assign(e.currentTarget.style, styles.optionHover);
              }
            }}
            onMouseLeave={(e) => {
              if (value !== option) {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.background = "#fff";
              }
            }}
          >
            {renderOption(option)}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * An interactive UI component for customizing avatar appearance.
 * Provides controls for selecting background, skin, t-shirt, expression, and hair.
 * Supports both controlled and uncontrolled modes.
 *
 * @param props - Picker configuration options
 * @param props.value - Current avatar configuration (for controlled mode)
 * @param props.onChange - Callback fired when any avatar attribute changes
 * @param props.className - Optional CSS class name for the container
 *
 * @example
 * ```tsx
 * // Controlled mode
 * const [config, setConfig] = useState<AvatarConfig>();
 * <AvatarPicker value={config} onChange={setConfig} />
 *
 * // Uncontrolled mode
 * <AvatarPicker onChange={(config) => console.log(config)} />
 * ```
 */
export function AvatarPicker({
  value,
  onChange,
  className,
}: AvatarPickerProps) {
  const [config, setConfig] = useState<AvatarConfig>(value || defaultConfig);

  // Sync with external value changes
  useEffect(() => {
    if (value) {
      setConfig(value);
    }
  }, [value]);

  const updateConfig = useCallback(
    <K extends keyof AvatarConfig>(key: K, val: AvatarConfig[K]) => {
      const newConfig = { ...config, [key]: val };
      setConfig(newConfig);
      onChange?.(newConfig);
    },
    [config, onChange],
  );

  const handleRandom = useCallback(() => {
    const newConfig = generateRandomConfig();
    setConfig(newConfig);
    onChange?.(newConfig);
  }, [onChange]);

  return (
    <div style={styles.container} className={className}>
      <div style={styles.controls}>
        <CategorySelector
          label="Background"
          options={BACKGROUNDS}
          value={config.background}
          onChange={(v) => updateConfig("background", v)}
          renderOption={(bg) => (
            <Avatar {...config} background={bg} size={48} />
          )}
        />

        <CategorySelector
          label="Skin"
          options={SKINS}
          value={config.skin}
          onChange={(v) => updateConfig("skin", v)}
          renderOption={(skin) => <Avatar {...config} skin={skin} size={48} />}
        />

        <CategorySelector
          label="T-Shirt"
          options={TSHIRTS}
          value={config.tshirt}
          onChange={(v) => updateConfig("tshirt", v)}
          renderOption={(tshirt) => (
            <Avatar {...config} tshirt={tshirt} size={48} />
          )}
        />

        <CategorySelector
          label="Expression"
          options={EXPRESSIONS}
          value={config.expression}
          onChange={(v) => updateConfig("expression", v)}
          renderOption={(expression) => (
            <Avatar {...config} expression={expression} size={48} />
          )}
        />

        <CategorySelector
          label="Hair"
          options={HAIRS}
          value={config.hair}
          onChange={(v) => updateConfig("hair", v)}
          renderOption={(hair) => <Avatar {...config} hair={hair} size={48} />}
        />

        <button
          type="button"
          style={styles.randomButton}
          onClick={handleRandom}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 0 0 #0078b8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 6px 0 0 #0078b8";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(4px)";
            e.currentTarget.style.boxShadow = "0 0 0 0 #0078b8";
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 0 0 #0078b8";
            e.currentTarget.style.color = "#fff";
          }}
        >
          Randomize
        </button>
      </div>
    </div>
  );
}
