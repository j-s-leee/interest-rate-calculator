"use client";

import React, { useState } from "react";

const Calculator = () => {
  const [type, setType] = useState<"savings" | "deposit">("savings");
  const [principal, setPrincipal] = useState(1000000); // 원금
  const [rate, setRate] = useState(3); // 금리(%)
  const [period, setPeriod] = useState(12); // 기간(개월)

  // 계산 로직
  const calculateSavings = () => {
    const monthlyRate = rate / 100 / 12;
    const total = (principal * ((1 + monthlyRate) ** period - 1)) / monthlyRate;
    return Math.round(total);
  };

  const calculateDeposit = () => {
    const monthlyRate = rate / 100 / 12;
    const total = principal * (1 + monthlyRate * period);
    return Math.round(total);
  };

  const result = type === "savings" ? calculateSavings() : calculateDeposit();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-4 max-w-lg mx-auto">
        {/* 제목 */}
        <h1 className="text-2xl font-bold text-center mb-4">
          Interest Rate Calculator
        </h1>

        {/* 적금/예금 선택 */}
        <div className="flex justify-center mb-6">
          <button
            className={`btn ${type === "savings" ? "btn-primary" : ""}`}
            onClick={() => setType("savings")}
          >
            적금
          </button>
          <button
            className={`btn ${type === "deposit" ? "btn-primary" : ""} ml-2`}
            onClick={() => setType("deposit")}
          >
            예금
          </button>
        </div>

        {/* 입력 필드 */}
        <div className="space-y-4">
          {/* 원금 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              원금: {principal.toLocaleString()} 원
            </label>
            <input
              type="range"
              min="100000"
              max="10000000"
              step="100000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="range range-primary"
            />
          </div>

          {/* 금리 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              금리: {rate}%
            </label>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="range range-secondary"
            />
          </div>

          {/* 기간 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              기간: {period}개월
            </label>
            <input
              type="range"
              min="1"
              max="60"
              step="1"
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
              className="range range-accent"
            />
          </div>
        </div>

        {/* 결과 */}
        <div className="mt-6 p-4 bg-base-200 rounded-lg text-center">
          <p className="text-lg font-bold">
            예상 {type === "savings" ? "적금" : "예금"} 총액:{" "}
            {result.toLocaleString()} 원
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
