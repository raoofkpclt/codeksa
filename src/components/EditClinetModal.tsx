import {
  useEffect,
  useRef,
  useState,
} from "react";

import type { Client } from "../utils/types";
import { uploadFile } from "../service/s3Service/upload";

type EditClientModalProps = {
  isOpen: boolean;
  client: Client | null;
  loading?: boolean;
  onClose: () => void;
  onSave: (
    updatedData: Partial<Client>
  ) => Promise<void>;
};

const DEFAULT_CLIENT_LOGO =
  "https://codeksa-web.s3.ap-south-1.amazonaws.com/clients/logos/Preto.jpeg";

const EditClientModal = ({
  isOpen,
  client,
  loading = false,
  onClose,
  onSave,
}: EditClientModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    logo: "",
    active: false,
    onboarding: false,
  });

  const [logoFile, setLogoFile] =
    useState<File | null>(null);

  const [logoPreview, setLogoPreview] =
    useState<string>("");

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const isLoading = loading || uploading;

  useEffect(() => {
    if (client && isOpen) {
      setFormData({
        name: client.name || "",
        email: client.email || "",
        logo: client.logo || "",
        active: client.active || false,
        onboarding:
          client.onboarding || false,
      });

      setLogoFile(null);
      setLogoPreview("");
      setError(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [client, isOpen]);

  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  if (!isOpen || !client) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    if (error) {
      setError(null);
    }
  };

  const handleLogoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Only images
    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );

      e.target.value = "";
      return;
    }

    // Maximum 5MB
    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Logo image must be less than 5MB."
      );

      e.target.value = "";
      return;
    }

    // Remove previous local preview
    if (logoPreview) {
      URL.revokeObjectURL(
        logoPreview
      );
    }

    const previewUrl =
      URL.createObjectURL(file);

    setLogoFile(file);
    setLogoPreview(previewUrl);
    setError(null);
  };

  const handleRemoveSelectedLogo = () => {
    if (logoPreview) {
      URL.revokeObjectURL(
        logoPreview
      );
    }

    setLogoFile(null);
    setLogoPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError(
        "Client name is required."
      );
      return;
    }

    if (!formData.email.trim()) {
      setError(
        "Email address is required."
      );
      return;
    }

    try {
      setError(null);

      // Keep existing logo by default
      let logoUrl =
        formData.logo?.trim() || "";

      // If new image selected,
      // upload to S3
      if (logoFile) {
        setUploading(true);

        const uploadedFile =
          await uploadFile(
            logoFile,
            "clients/logos"
          );

        // New S3 URL
        logoUrl = uploadedFile.url;

        console.log(
          "Updated logo uploaded:",
          uploadedFile
        );
      }

      // Update Firestore
      await onSave({
        name: formData.name.trim(),

        email: formData.email
          .trim()
          .toLowerCase(),

        logo: logoUrl,

        active: formData.active,

        onboarding:
          formData.onboarding,
      });

      handleReset();

    } catch (error) {
      console.error(
        "Failed to edit client:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update client."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    if (logoPreview) {
      URL.revokeObjectURL(
        logoPreview
      );
    }

    setLogoFile(null);
    setLogoPreview("");
    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    if (isLoading) return;

    handleReset();
    onClose();
  };

  const displayLogo =
    logoPreview ||
    formData.logo ||
    DEFAULT_CLIENT_LOGO;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={handleClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111116] shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        <form onSubmit={handleSubmit}>

          {/* Header */}
          <div className="flex items-start justify-between border-b border-white/10 p-6">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Edit Client
              </h2>

              <p className="mt-1 text-sm text-white/40">
                Update client account
                information and logo.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/5 hover:text-white disabled:opacity-40"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <div className="space-y-5 p-6">

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3">
                <p className="text-sm text-rose-400">
                  {error}
                </p>
              </div>
            )}

            {/* Logo */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Client Logo
              </label>

              <div className="flex items-center gap-4">

                {/* Preview */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white">
                  <img
                    src={displayLogo}
                    alt={
                      formData.name ||
                      "Client logo"
                    }
                    className="h-full w-full object-contain p-2"
                    onError={(e) => {
                      e.currentTarget.onerror =
                        null;

                      e.currentTarget.src =
                        DEFAULT_CLIENT_LOGO;
                    }}
                  />
                </div>

                <div className="flex-1">

                  {/* Hidden Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={
                      handleLogoChange
                    }
                    disabled={isLoading}
                    className="hidden"
                  />

                  <div className="flex flex-wrap gap-2">

                    {/* Choose / Change */}
                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      disabled={isLoading}
                      className="rounded-xl bg-violet-600 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-violet-500 disabled:opacity-50"
                    >
                      {logoFile
                        ? "Change Image"
                        : "Choose New Logo"}
                    </button>

                    {/* Cancel Selected */}
                    {logoFile && (
                      <button
                        type="button"
                        onClick={
                          handleRemoveSelectedLogo
                        }
                        disabled={isLoading}
                        className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-rose-400 transition hover:bg-rose-500/20 disabled:opacity-50"
                      >
                        Cancel Image
                      </button>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-white/25">
                    JPG, PNG, WEBP or other
                    image formats. Maximum 5MB.
                  </p>

                  {logoFile && (
                    <p className="mt-1 max-w-xs truncate text-xs text-violet-400">
                      {logoFile.name}
                    </p>
                  )}

                  {!logoFile &&
                    formData.logo && (
                      <p className="mt-1 text-xs text-emerald-400">
                        Current logo
                      </p>
                    )}
                </div>
              </div>
            </div>

            {/* Name */}
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
                placeholder="Enter email address"
                disabled={isLoading}
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-violet-500/60 focus:bg-white/[0.06] disabled:opacity-50"
              />
            </div>

            {/* UID */}
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Client UID
              </label>

              <input
                type="text"
                value={client.uid || ""}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 font-mono text-xs text-white/30 outline-none"
              />
            </div>

            {/* Account Settings */}
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                Account Settings
              </p>

              <div className="space-y-3">

                {/* Active */}
                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.05]">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Active Account
                    </p>

                    <p className="mt-1 text-xs text-white/35">
                      Allow this client to
                      access the platform.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="active"
                    checked={
                      formData.active
                    }
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-5 w-5 accent-violet-600"
                  />
                </label>

                {/* Onboarding */}
                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.05]">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Onboarding Completed
                    </p>

                    <p className="mt-1 text-xs text-white/35">
                      Mark client onboarding
                      as completed.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="onboarding"
                    checked={
                      formData.onboarding
                    }
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-5 w-5 accent-violet-600"
                  />
                </label>

              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="flex gap-3 border-t border-white/10 p-6">

            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white/60 transition hover:bg-white/[0.08] hover:text-white disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-violet-500 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  {uploading
                    ? "Uploading..."
                    : "Saving..."}
                </>
              ) : (
                "Save Changes"
              )}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClientModal;