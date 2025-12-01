"use client";

import { useState, useCallback, useEffect } from 'react';
import { Avatar, generateRandomConfig, defaultConfig } from './Avatar';
import {
  AvatarConfig,
  AvatarPickerProps,
  BACKGROUNDS,
  SKINS,
  TSHIRTS,
  EXPRESSIONS,
  HAIRS
} from '../types';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  preview: {
    display: 'flex',
    justifyContent: 'center',
    padding: '24px',
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    borderRadius: '16px'
  },
  controls: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  category: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px'
  },
  label: {
    fontSize: '13px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    color: '#64748b',
    letterSpacing: '0.05em'
  },
  options: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px'
  },
  option: {
    padding: '8px 14px',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    background: '#fff',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
    color: '#475569',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  optionHover: {
    borderColor: '#c7d2fe',
    background: '#f8fafc'
  },
  optionSelected: {
    borderColor: '#8b5cf6',
    background: '#f3e8ff',
    color: '#7c3aed'
  },
  randomButton: {
    padding: '14px 28px',
    border: 'none',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: 600,
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
    marginTop: '8px'
  }
};

interface CategorySelectorProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}

function CategorySelector<T extends string>({
  label,
  options,
  value,
  onChange
}: CategorySelectorProps<T>) {
  return (
    <div style={styles.category}>
      <span style={styles.label}>{label}</span>
      <div style={styles.options}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            style={{
              ...styles.option,
              ...(value === option ? styles.optionSelected : {})
            }}
            onClick={() => onChange(option)}
            onMouseEnter={(e) => {
              if (value !== option) {
                Object.assign(e.currentTarget.style, styles.optionHover);
              }
            }}
            onMouseLeave={(e) => {
              if (value !== option) {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.background = '#fff';
              }
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AvatarPicker({
  value,
  onChange,
  className
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
    [config, onChange]
  );

  const handleRandom = useCallback(() => {
    const newConfig = generateRandomConfig();
    setConfig(newConfig);
    onChange?.(newConfig);
  }, [onChange]);

  return (
    <div style={styles.container} className={className}>
      <div style={styles.preview}>
        <Avatar {...config} size={180} />
      </div>

      <div style={styles.controls}>
        <CategorySelector
          label="Background"
          options={BACKGROUNDS}
          value={config.background}
          onChange={(v) => updateConfig('background', v)}
        />

        <CategorySelector
          label="Skin"
          options={SKINS}
          value={config.skin}
          onChange={(v) => updateConfig('skin', v)}
        />

        <CategorySelector
          label="T-Shirt"
          options={TSHIRTS}
          value={config.tshirt}
          onChange={(v) => updateConfig('tshirt', v)}
        />

        <CategorySelector
          label="Expression"
          options={EXPRESSIONS}
          value={config.expression}
          onChange={(v) => updateConfig('expression', v)}
        />

        <CategorySelector
          label="Hair"
          options={HAIRS}
          value={config.hair}
          onChange={(v) => updateConfig('hair', v)}
        />

        <button
          type="button"
          style={styles.randomButton}
          onClick={handleRandom}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(99, 102, 241, 0.4)';
          }}
        >
          Randomize
        </button>
      </div>
    </div>
  );
}
