import { useEffect, useState } from "react";

export type AddClientData = {
  name: string;
  email: string;
  company: string;
  password: string;
};

type AddClientModalProps = {
  isOpen: boolean;
  loading?: boolean;
  onClose: () => void;
  onSave: (data: AddClientData) => Promise<void>;
};

const initialFormData: AddClientData = {
  name: "",
  email: "",
  company: "",
  password: "",
};

const AddClientModal = ({
  isOpen,
  loading = false,
  onClose,
  onSave,
}: AddClientModalProps) => {
  const [formData, setFormData] = useState<AddClientData>(initialFormData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormData);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
console.log(formData)
    if (!formData.name.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email address is required.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }
    if(!formData.company){
      setError("Enter company name");
      return;
    }

    try {
      setError(null);

      await onSave({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        company: formData.company.trim(),
        password: formData.password,
      });

      setFormData(initialFormData);
    } catch (err) {
      console.error("Create client error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to create client. Please try again.",
      );
    }
  };

  const handleClose = () => {
    if (loading) return;

    setFormData(initialFormData);
    setError(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={handleClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-white/10 bg-[#0c0c11] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Add a client
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-white/40">
                Creates the account and grants access to CODE Hub™. Share
                the password securely.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="text-white/40 transition hover:text-white disabled:opacity-40"
            >
              ✕
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 border border-rose-500/20 bg-rose-500/10 px-4 py-3">
              <p className="text-sm text-rose-400">{error}</p>
            </div>
          )}

          {/* Fields */}
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Full Name <span className="text-violet-400">*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                required
                autoComplete="name"
                className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-violet-500/60 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Email <span className="text-violet-400">*</span>
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                required
                autoComplete="off"
                className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-violet-500/60 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Company
              </label>

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                disabled={loading}
                autoComplete="organization"
                className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-violet-500/60 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Temporary Password <span className="text-violet-400">*</span>
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-violet-500/60 disabled:opacity-50"
              />

              <p className="mt-2 text-xs text-white/25">
                Minimum 8 characters. The client can change it later.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white/60 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-violet-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating...
                </>
              ) : (
                "Create Client"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;