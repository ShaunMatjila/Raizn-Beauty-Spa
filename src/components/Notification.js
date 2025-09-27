"use client";
import { useState, useEffect } from "react";
import { Check, X, AlertTriangle, Info, XIcon } from "lucide-react";

export default function Notification({
  type = "success",
  title = "",
  message = "",
  autoclose = true,
  timeout = 5000,
  isVisible,
  onClose,
}) {
  const [show, setShow] = useState(isVisible);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setShow(isVisible);
    if (isVisible) {
      setProgress(100);
    }
  }, [isVisible]);

  useEffect(() => {
    if (show && autoclose) {
      const interval = 50;
      const steps = timeout / interval;
      const stepValue = 100 / steps;

      const timer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - stepValue;
          if (newProgress <= 0) {
            clearInterval(timer);
            setShow(false);
            setTimeout(() => {
              onClose?.();
            }, 300);
            return 0;
          }
          return newProgress;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [show, autoclose, timeout, onClose]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose?.();
    }, 300); // Wait for animation to complete
  };

  const getIconConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: <Check className="w-5 h-5" strokeWidth={2} />,
          bgColor: "bg-gradient-to-r from-green-500 to-emerald-500",
          iconColor: "text-white",
          progressColor: "bg-green-500",
          borderColor: "border-green-200",
        };
      case "error":
        return {
          icon: <X className="w-5 h-5" strokeWidth={2} />,
          bgColor: "bg-gradient-to-r from-red-500 to-rose-500",
          iconColor: "text-white",
          progressColor: "bg-red-500",
          borderColor: "border-red-200",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-5 h-5" strokeWidth={2} />,
          bgColor: "bg-gradient-to-r from-amber-500 to-yellow-500",
          iconColor: "text-white",
          progressColor: "bg-amber-500",
          borderColor: "border-amber-200",
        };
      case "info":
        return {
          icon: <Info className="w-5 h-5" strokeWidth={2} />,
          bgColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
          iconColor: "text-white",
          progressColor: "bg-blue-500",
          borderColor: "border-blue-200",
        };
      default:
        return {
          icon: <Info className="w-5 h-5" strokeWidth={2} />,
          bgColor: "bg-gradient-to-r from-pink-500 to-purple-500",
          iconColor: "text-white",
          progressColor: "bg-pink-500",
          borderColor: "border-pink-200",
        };
    }
  };

  const { icon, bgColor, iconColor, progressColor, borderColor } = getIconConfig();

  if (!show) return null;

  return (
    <div
      className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-2xl border ${borderColor} backdrop-blur-sm bg-white/95 transform transition-all duration-300 ease-out ${
        show ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95"
      }`}
    >
      <div className="p-4">
        <div className="flex items-start">
          {/* Icon container */}
          <div className="flex-shrink-0">
            <div
              className={`flex items-center justify-center h-10 w-10 rounded-lg ${bgColor} shadow-lg`}
            >
              <span className={iconColor}>
                {icon}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="ml-3 w-0 flex-1 pt-0.5">
            {title && (
              <p className="text-sm font-semibold text-gray-900 leading-tight">{title}</p>
            )}
            {message && (
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">{message}</p>
            )}

            {/* Progress bar for autoclose */}
            {autoclose && (
              <div className="mt-3">
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${progressColor} transition-all duration-75 ease-linear rounded-full`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Close button */}
          <div className="ml-4 flex flex-shrink-0">
            <button
              onClick={handleClose}
              className="inline-flex rounded-lg p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-200"
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient line */}
      <div className={`h-1 w-full ${progressColor} opacity-30`} />
    </div>
  );
}
