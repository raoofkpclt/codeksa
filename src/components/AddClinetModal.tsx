import { useEffect, useRef, useState } from "react";

import { uploadFile } from "../service/s3Service/upload";

export type AddClientData = {
  name: string;
  email: string;
  password: string;
  logo?: string;
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
  password: "",
  logo: "",
};

const AddClientModal = ({
  isOpen,
  loading = false,
  onClose,
  onSave,
}: AddClientModalProps) => {
  const [formData, setFormData] = useState<AddClientData>(initialFormData);

  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [logoPreview, setLogoPreview] = useState<string>("");

  const [uploading, setUploading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isLoading = loading || uploading;

  // useEffect(() => {
  //   if (isOpen) {
  //     setFormData(initialFormData);
  //     setLogoFile(null);
  //     setLogoPreview("");
  //     setShowPassword(false);
  //     setError(null);
  //   }
  // }, [isOpen]);

  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError(null);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Only images for client logo
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");

      e.target.value = "";
      return;
    }

    // Maximum 5MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("Logo image must be less than 5MB.");

      e.target.value = "";
      return;
    }

    // Remove previous preview URL
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setLogoFile(file);
    setLogoPreview(previewUrl);
    setError(null);
  };

  const handleRemoveLogo = () => {
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }

    setLogoFile(null);
    setLogoPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Client name is required.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email address is required.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setError(null);

      let logoUrl = "";

      // 1. Upload logo to S3
      if (logoFile) {
        setUploading(true);

        const uploadedFile = await uploadFile(logoFile, "clients/logos");

        // 2. Get S3 URL
        logoUrl = uploadedFile.url;

        console.log("S3 Upload Success:", uploadedFile);
      }

      // 3. Send S3 URL to parent
      await onSave({
        name: formData.name.trim(),

        email: formData.email.trim().toLowerCase(),

        password: formData.password,

        // S3 URL
        logo: logoUrl,
      });

      // 4. Reset form
      setFormData(initialFormData);

      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }

      setLogoFile(null);
      setLogoPreview("");
      setShowPassword(false);
      setError(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Create client error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to create client. Please try again.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    if (isLoading) return;

    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }

    setFormData(initialFormData);
    setLogoFile(null);
    setLogoPreview("");
    setShowPassword(false);
    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={handleClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111116] shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex items-start justify-between border-b border-white/10 p-6">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Add New Client
              </h2>

              <p className="mt-1 text-sm text-white/40">
                Create a new client account and login credentials.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              ✕
            </button>
          </div>

          {/* Form Content */}
          <div className="space-y-5 p-6">
            {/* Error */}
            {error && (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3">
                <p className="text-sm text-rose-400">{error}</p>
              </div>
            )}

            {/* Logo Upload */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Client Logo
              </label>

              <div className="flex items-center gap-4">
                {/* Preview */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white">
                  <img
                    src={logoPreview || "/logo.png"}
                    alt="Client logo preview"
                    className="h-full w-full object-contain p-2"
                    onError={(e) => {
                      e.currentTarget.src = "/logo.png";
                    }}
                  />
                </div>

                <div className="flex-1">
                  {/* Hidden Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    disabled={isLoading}
                    className="hidden"
                  />

                  <div className="flex flex-wrap gap-2">
                    {/* Choose Image */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isLoading}
                      className="rounded-xl bg-violet-600 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Choose Image
                    </button>

                    {/* Remove */}
                    {logoFile && (
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        disabled={isLoading}
                        className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-rose-400 transition hover:bg-rose-500/20 disabled:opacity-50"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-white/25">
                    Upload JPG, PNG, WEBP or other image formats. Maximum 5MB.
                  </p>

                  {/* Selected File */}
                  {logoFile && (
                    <p className="mt-1 max-w-xs truncate text-xs text-violet-400">
                      {logoFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Client Name */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Client Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter client name"
                disabled={isLoading}
                required
                autoComplete="organization"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-violet-500/60 focus:bg-white/[0.06] disabled:opacity-50"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="client@example.com"
                disabled={isLoading}
                required
                autoComplete="off"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-violet-500/60 focus:bg-white/[0.06] disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  disabled={isLoading}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-violet-500/60 focus:bg-white/[0.06] disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-violet-400 transition hover:text-violet-300 disabled:opacity-40"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <p className="mt-2 text-xs text-white/25">
                Minimum 6 characters required.
              </p>
            </div>

            {/* Status */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-medium text-white">Account Status</p>

              <p className="mt-1 text-xs text-white/35">
                Admin-created clients are activated immediately with onboarding
                completed.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-400">
                  Active
                </span>

                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-blue-400">
                  Onboarding Completed
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 border-t border-white/10 p-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white/60 transition hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  {uploading ? "Uploading..." : "Creating..."}
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
