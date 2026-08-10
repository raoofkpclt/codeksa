import type { ReactNode } from "react";

export type ModalVariant =
  | "danger"
  | "success"
  | "warning"
  | "info"
  | "primary";

type ReusableModalProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  children?: ReactNode;

  confirmText?: string;
  cancelText?: string;

  variant?: ModalVariant;

  loading?: boolean;
  loadingText?: string;

  showCancel?: boolean;

  onConfirm?: () => void | Promise<void>;
  onClose: () => void;
};

const variantStyles: Record<
  ModalVariant,
  {
    iconBg: string;
    iconText: string;
    button: string;
    icon: string;
  }
> = {
  danger: {
    iconBg: "bg-rose-500/10",
    iconText: "text-rose-400",
    button: "bg-rose-600 hover:bg-rose-500",
    icon: "!",
  },

  success: {
    iconBg: "bg-emerald-500/10",
    iconText: "text-emerald-400",
    button: "bg-emerald-600 hover:bg-emerald-500",
    icon: "✓",
  },

  warning: {
    iconBg: "bg-amber-500/10",
    iconText: "text-amber-400",
    button: "bg-amber-600 hover:bg-amber-500",
    icon: "!",
  },

  info: {
    iconBg: "bg-blue-500/10",
    iconText: "text-blue-400",
    button: "bg-blue-600 hover:bg-blue-500",
    icon: "i",
  },

  primary: {
    iconBg: "bg-violet-500/10",
    iconText: "text-violet-400",
    button: "bg-violet-600 hover:bg-violet-500",
    icon: "+",
  },
};

const ReusableModal = ({
  isOpen,
  title,
  description,
  children,

  confirmText = "Confirm",
  cancelText = "Cancel",

  variant = "primary",

  loading = false,
  loadingText = "Processing...",

  showCancel = true,

  onConfirm,
  onClose,
}: ReusableModalProps) => {
  if (!isOpen) return null;

  const styles = variantStyles[variant];

  const handleBackdropClick = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={handleBackdropClick}
    >
      <div
        className="w-full max-w-md border border-white/10 bg-[#0c0c11] p-8"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center text-xl font-bold ${styles.iconBg} ${styles.iconText}`}
          >
            {styles.icon}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-white">{title}</h2>

            {description && (
              <p className="mt-2 text-sm leading-relaxed text-white/40">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="shrink-0 text-white/40 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            ✕
          </button>
        </div>

        {/* Custom Content */}
        {children && <div className="mt-6">{children}</div>}

        {/* Actions */}
        <div className="mt-10 flex justify-end gap-3">
          {showCancel && (
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white/60 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {cancelText}
            </button>
          )}

          {onConfirm && (
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className={`flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${styles.button}`}
            >
              {loading ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {loadingText}
                </>
              ) : (
                confirmText
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;
