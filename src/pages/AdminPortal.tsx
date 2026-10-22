import React, { useState } from 'react';
import { useBooking, formatINR, SiteConfig } from '../context/BookingContext';
import { Stay, SpaceBreakdown, RatingBreakdown, HostInfo } from '../data/stays';
import { Review } from '../data/reviews';
import {
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  Building,
  MessageSquare,
  Video,
  Phone,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit,
  Copy,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Save,
  RotateCcw,
  Sparkles,
  Eye,
  EyeOff,
  Star,
  MapPin,
  X,
  Play,
  ArrowRight,
  Layers,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  UploadCloud,
  RefreshCw,
} from 'lucide-react';

export const AdminPortalPage: React.FC = () => {
  const {
    allStays,
    addStay,
    updateStay,
    deleteStay,
    allReviews,
    addReview,
    updateReview,
    deleteReview,
    siteConfig,
    updateSiteConfig,
    exportAllData,
    importAllData,
    resetToDefaults,
    navigateTo,
  } = useBooking();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('connekt_admin_auth') === 'true';
  });

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'stays' | 'reviews' | 'media' | 'contact' | 'backup'>('stays');

  // Status Toast
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim() === 'connekthome' && passwordInput.trim() === 'connekt4508') {
      sessionStorage.setItem('connekt_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
      showToast('Welcome back, Connekt Admin!');
    } else {
      setAuthError('Invalid credentials. Please verify your administrative username and password.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('connekt_admin_auth');
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
  };

  // Modal / Editor State for Stays
  const [editingStay, setEditingStay] = useState<Stay | null>(null);
  const [isNewStayModal, setIsNewStayModal] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [showBulkUrlBox, setShowBulkUrlBox] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Local device image files upload handler (with automatic client-side compression)
  const handleImageFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editingStay) return;
    setIsUploadingImage(true);

    const fileList = Array.from(files);
    const readAndCompress = (file: File): Promise<string> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          const img = new Image();
          img.onload = () => {
            const maxDim = 1600;
            let width = img.width;
            let height = img.height;
            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL('image/jpeg', 0.86));
            } else {
              resolve(dataUrl);
            }
          };
          img.onerror = () => resolve(dataUrl);
          img.src = dataUrl;
        };
        reader.readAsDataURL(file);
      });
    };

    try {
      const dataUrls = await Promise.all(fileList.map(readAndCompress));
      setEditingStay((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          images: [...prev.images, ...dataUrls],
        };
      });
      showToast(`Added ${dataUrls.length} photo${dataUrls.length > 1 ? 's' : ''} to residence gallery.`);
    } catch {
      showToast('Failed to upload image(s). Please try again.', 'error');
    } finally {
      setIsUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleAddSingleImageUrl = () => {
    if (!newImageUrl.trim() || !editingStay) return;
    setEditingStay({
      ...editingStay,
      images: [...editingStay.images, newImageUrl.trim()],
    });
    setNewImageUrl('');
    showToast('Image URL added.');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (!editingStay) return;
    if (editingStay.images.length <= 1) {
      showToast('Every residence must have at least one image.', 'error');
      return;
    }
    setEditingStay({
      ...editingStay,
      images: editingStay.images.filter((_, idx) => idx !== indexToRemove),
    });
  };

  const handleSetCoverImage = (index: number) => {
    if (!editingStay || index === 0) return;
    const copy = [...editingStay.images];
    const [selected] = copy.splice(index, 1);
    copy.unshift(selected);
    setEditingStay({ ...editingStay, images: copy });
    showToast('Cover photo updated.');
  };

  const handleMoveImage = (index: number, direction: 'left' | 'right') => {
    if (!editingStay) return;
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= editingStay.images.length) return;
    const copy = [...editingStay.images];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);
    setEditingStay({ ...editingStay, images: copy });
  };

  // Modal / Editor State for Reviews
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isNewReviewModal, setIsNewReviewModal] = useState(false);

  // Import State
  const [jsonPasteInput, setJsonPasteInput] = useState('');

  // Site Config Form State
  const [configForm, setConfigForm] = useState<SiteConfig>(siteConfig);

  // Sync configForm when siteConfig updates
  React.useEffect(() => {
    setConfigForm(siteConfig);
  }, [siteConfig]);

  // Handle Export Download
  const handleDownloadBackup = () => {
    const dataStr = exportAllData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `connekt-homes-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Current website data exported successfully as JSON!');
  };

  // Handle File Upload Import
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = importAllData(content);
        if (res.success) {
          showToast(res.message);
        } else {
          showToast(res.message, 'error');
        }
      }
    };
    reader.readAsText(file);
    // Reset file input
    e.target.value = '';
  };

  // Handle Raw JSON Paste Import
  const handleRawJsonImport = () => {
    if (!jsonPasteInput.trim()) {
      showToast('Please paste a JSON string first.', 'error');
      return;
    }
    const res = importAllData(jsonPasteInput);
    if (res.success) {
      showToast(res.message);
      setJsonPasteInput('');
    } else {
      showToast(res.message, 'error');
    }
  };

  // Blank Stay Template
  const createBlankStay = (): Stay => {
    const newId = `residence-${Date.now().toString(36)}`;
    return {
      id: newId,
      name: 'New Serviced Residence',
      tagline: 'Curated luxury serviced apartment in Mumbai',
      area: 'Bandra West',
      neighborhood: 'Bandra West',
      city: 'Mumbai',
      type: 'Serviced Residence',
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2,
      sizeSqM: 75,
      sizeSqFt: 800,
      floor: '1st Floor with Lift',
      pricePerNight: 9500,
      originalPrice: 11000,
      cleaningFee: 1200,
      rating: 4.8,
      reviewCount: 24,
      isSuperhost: true,
      featured: true,
      images: [
        'https://res.cloudinary.com/yvbshrkz/image/upload/v1792654430/36d01175-b1e0-4de6-8cda-26f28b3aeee6.avif',
      ],
      description: 'Spacious serviced residence with full kitchen, high-speed Wi-Fi, and 24/7 host care.',
      conciergeNote: 'Dedicated on-ground host available on WhatsApp 24/7.',
      highlights: [
        'Walking distance to cafes and promenades',
        'High-speed optical fiber WiFi (300 Mbps)',
        'Daily housekeeping & fresh linens',
        'Full kitchen with complete appliances',
      ],
      hostInfo: {
        name: 'Connekt Homes',
        badge: 'Superhost',
        yearsHosting: '11 years hosting',
        bio: 'Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.',
      },
      ratingBreakdown: {
        cleanliness: 4.8,
        accuracy: 4.8,
        checkIn: 4.9,
        communication: 4.9,
        location: 4.8,
        value: 4.7,
      },
      spaceBreakdown: {
        livingRoom: 'Comfortable living lounge with plush sofa and Smart TV.',
        bedroom1: 'Master bedroom with Queen bed, attached bath, and AC.',
        bedroom2: 'Second bedroom with Queen bed, ensuite bath, and AC.',
        bathrooms: '2 modern bathrooms with 24/7 hot water geysers and glass shower enclosures.',
        kitchen: 'Modular kitchen with gas stove, microwave, fridge, toaster, and cookware.',
        amenitiesNotes: 'Fresh linens, high-speed WiFi, and scheduled daily housekeeping.',
        guestAccess: 'Full private access with elevator and 24/7 building security.',
        addOnServices: [
          'Home-cooked healthy meals by verified local chef',
          'Airport pickup and drop service',
          'In-house therapeutic massage upon request',
        ],
      },
      amenities: {
        wifi: true,
        kitchen: true,
        ac: true,
        workspace: true,
        washer: true,
        smartTv: true,
        housekeeping: true,
        elevator: true,
        selfCheckIn: true,
        petsAllowed: false,
        parking: true,
        balcony: true,
      },
      sleepingArrangements: [
        { room: 'Bedroom 1', bedType: '1 Queen Bed', details: 'Attached bathroom, AC, wardrobe' },
        { room: 'Bedroom 2', bedType: '1 Queen Bed', details: 'Ensuite bathroom, AC, wardrobe' },
      ],
      houseRules: [
        'Check-in: 2:00 PM onwards · Digital lockbox self check-in',
        'Check-out: 11:00 AM',
        'No smoking inside apartment',
        'Quiet hours after 10:00 PM',
      ],
      cancellationPolicy: 'Free cancellation up to 7 days before check-in. 50% refund thereafter.',
      coordinates: {
        lat: 19.06,
        lng: 72.83,
        xPercent: 40,
        yPercent: 50,
      },
      nearbyPlaces: [
        { name: 'Carter Road Promenade', distance: '3 mins walk', type: 'Scenic' },
        { name: 'Pali Market', distance: '5 mins walk', type: 'Shopping' },
      ],
    };
  };

  // Blank Review Template
  const createBlankReview = (): Review => {
    return {
      id: `rev-${Date.now().toString(36)}`,
      guestName: 'Guest Name',
      location: 'Mumbai, India',
      stayDate: 'Recent Stay',
      rating: 5,
      comment: 'Exceptional stay with Connekt Homes! Beautifully maintained and outstanding host support.',
      propertyStayed: allStays[0]?.name || 'Connekt Residence',
      isVerified: true,
    };
  };

  // If not logged in, render the secure authentication gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 sm:p-6 pt-24 pb-20">
        <div className="w-full max-w-md bg-white rounded-[28px] p-8 sm:p-10 shadow-[0_20px_60px_rgba(20,33,61,0.08)] border border-[#E8E2D8] relative overflow-hidden">
          {/* Subtle Top Accent Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B89B72] via-[#D93A6B] to-[#2A8CB5]" />

          <div className="text-center space-y-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#14213D] text-[#FAF6F0] flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6 text-[#D93A6B]" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D]">
              Connekt Admin Suite
            </h1>
            <p className="text-xs sm:text-sm text-[#2B2F3A]/70 max-w-xs mx-auto">
              Private administrative portal for rooms, reviews, media and live site synchronization.
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-3.5 rounded-[12px] bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full px-4 py-3 rounded-[12px] bg-[#FAF7F2] border border-[#E8E2D8] text-sm text-[#14213D] focus:outline-none focus:border-[#D93A6B] focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 rounded-[12px] bg-[#FAF7F2] border border-[#E8E2D8] text-sm text-[#14213D] focus:outline-none focus:border-[#D93A6B] focus:bg-white transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2B2F3A]/50 hover:text-[#14213D] p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#14213D] hover:bg-[#1E2E4F] text-[#FAF6F0] rounded-[14px] text-xs font-semibold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Unlock className="w-4 h-4 text-[#D93A6B]" />
              <span>Enter Management Portal</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E8E2D8] text-center">
            <button
              onClick={() => navigateTo('/')}
              className="text-xs text-[#2B2F3A]/60 hover:text-[#D93A6B] transition-colors"
            >
              ← Return to Connekt Homes Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-24 sm:pt-28 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-[14px] shadow-2xl flex items-center gap-3 text-xs font-medium animate-bounce border ${
            toastMessage.type === 'success'
              ? 'bg-[#14213D] text-white border-white/20'
              : 'bg-red-600 text-white border-white/20'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-[#9DB5A0]" />
          ) : (
            <AlertCircle className="w-4 h-4 text-white" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#E8E2D8] mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Live Synced with Website
              </span>
            </div>
            <h1 className="font-serif text-3xl font-medium text-[#14213D]">
              Connekt Homes Management Portal
            </h1>
            <p className="text-xs text-[#2B2F3A]/70">
              Manage residences, customer reviews, media showcase, and live export/import data.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigateTo('/')}
              className="px-4 py-2.5 rounded-[12px] bg-[#FAF7F2] hover:bg-[#F2ECE4] text-[#14213D] text-xs font-semibold border border-[#E8E2D8] flex items-center gap-2 cursor-pointer transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#D93A6B]" />
              <span>View Website</span>
            </button>

            <button
              onClick={handleDownloadBackup}
              className="px-4 py-2.5 rounded-[12px] bg-[#14213D] hover:bg-[#1E2E4F] text-[#FAF6F0] text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#B89B72]" />
              <span>Export Data JSON</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-[12px] bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold border border-red-200 cursor-pointer transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-[#E8E2D8]">
          <button
            onClick={() => setActiveTab('stays')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'stays'
                ? 'bg-[#14213D] text-[#FAF6F0] shadow-sm'
                : 'bg-white hover:bg-[#F6F2EB] text-[#14213D] border border-[#E8E2D8]'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-[#D93A6B]" />
            <span>Residences ({allStays.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'bg-[#14213D] text-[#FAF6F0] shadow-sm'
                : 'bg-white hover:bg-[#F6F2EB] text-[#14213D] border border-[#E8E2D8]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#B89B72]" />
            <span>Guest Reviews ({allReviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'media'
                ? 'bg-[#14213D] text-[#FAF6F0] shadow-sm'
                : 'bg-white hover:bg-[#F6F2EB] text-[#14213D] border border-[#E8E2D8]'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-[#2A8CB5]" />
            <span>Video & Media</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'contact'
                ? 'bg-[#14213D] text-[#FAF6F0] shadow-sm'
                : 'bg-white hover:bg-[#F6F2EB] text-[#14213D] border border-[#E8E2D8]'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-[#9DB5A0]" />
            <span>Contact & Reception</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'backup'
                ? 'bg-[#14213D] text-[#FAF6F0] shadow-sm'
                : 'bg-white hover:bg-[#F6F2EB] text-[#14213D] border border-[#E8E2D8]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#D93A6B]" />
            <span>Backup & Data Sync</span>
          </button>
        </div>

        {/* TAB 1: RESIDENCES / STAYS */}
        {activeTab === 'stays' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-medium text-[#14213D]">
                  Serviced Residences
                </h2>
                <p className="text-xs text-[#2B2F3A]/70">
                  Add, edit, clone or delete apartment listings. All changes update instantly on the site.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingStay(createBlankStay());
                  setIsNewStayModal(true);
                }}
                className="px-4 py-2.5 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-[12px] shadow-sm flex items-center gap-2 cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Residence</span>
              </button>
            </div>

            {/* Residences Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allStays.map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-[22px] overflow-hidden border border-[#E8E2D8] shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="relative aspect-[16/10] bg-[#14213D] overflow-hidden">
                    <img
                      src={s.images[0]}
                      alt={s.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#14213D]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-white">
                      {s.area}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-[#14213D] flex items-center gap-1 shadow">
                      <Star className="w-3 h-3 fill-[#B89B72] text-[#B89B72]" />
                      <span>{s.rating}</span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-white flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-[#B89B72]" />
                      <span>{s.images.length} {s.images.length === 1 ? 'Photo' : 'Photos'}</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-serif text-lg font-medium text-[#14213D] line-clamp-1">
                        {s.name}
                      </h3>
                      <p className="text-xs text-[#2B2F3A]/70 line-clamp-2 mt-1">
                        {s.tagline}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-[#2B2F3A]/80 font-medium mt-3 pt-3 border-t border-[#E8E2D8]/60">
                        <span>{s.bedrooms} Beds</span>
                        <span>·</span>
                        <span>{s.bathrooms} Baths</span>
                        <span>·</span>
                        <span>{s.guests} Guests</span>
                        <span>·</span>
                        <span>{s.sizeSqFt} sqft</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E8E2D8] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#2B2F3A]/60 block uppercase font-bold">
                          Nightly Rate
                        </span>
                        <span className="font-serif text-lg font-bold text-[#14213D]">
                          {formatINR(s.pricePerNight)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => navigateTo(`/stay/${s.id}`)}
                          title="Preview on website"
                          className="p-2 rounded-[10px] bg-[#FAF7F2] hover:bg-[#EAE3D6] text-[#14213D] transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingStay({ ...s });
                            setIsNewStayModal(false);
                          }}
                          title="Edit Residence"
                          className="p-2 rounded-[10px] bg-[#14213D] hover:bg-[#1E2E4F] text-white transition-colors cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const clone = {
                              ...s,
                              id: `stay-${Date.now().toString(36)}`,
                              name: `${s.name} (Copy)`,
                            };
                            addStay(clone);
                            showToast(`Duplicated "${s.name}"`);
                          }}
                          title="Duplicate Residence"
                          className="p-2 rounded-[10px] bg-[#FAF7F2] hover:bg-[#EAE3D6] text-[#14213D] transition-colors cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (allStays.length <= 1) {
                              showToast('At least one residence must remain listed.', 'error');
                              return;
                            }
                            if (window.confirm(`Are you sure you want to delete "${s.name}"?`)) {
                              deleteStay(s.id);
                              showToast(`Deleted "${s.name}"`);
                            }
                          }}
                          title="Delete Residence"
                          className="p-2 rounded-[10px] bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-medium text-[#14213D]">
                  Guest Reviews & Testimonials
                </h2>
                <p className="text-xs text-[#2B2F3A]/70">
                  Manage real guest reviews displayed in the homepage auto-loop marquee and stay details.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingReview(createBlankReview());
                  setIsNewReviewModal(true);
                }}
                className="px-4 py-2.5 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-[12px] shadow-sm flex items-center gap-2 cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Review</span>
              </button>
            </div>

            {/* Reviews Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allReviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-white rounded-[20px] p-5 border border-[#E8E2D8] shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#14213D] text-[#FAF6F0] font-bold text-xs flex items-center justify-center">
                          {r.guestName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#14213D] flex items-center gap-1.5">
                            <span>{r.guestName}</span>
                            {r.isVerified && (
                              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-medium border border-emerald-200">
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#2B2F3A]/60">
                            {r.location} · {r.stayDate}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-[#B89B72]">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-[#2B2F3A]/85 italic leading-relaxed pt-2">
                      “{r.comment}”
                    </p>

                    {r.propertyStayed && (
                      <div className="text-[11px] text-[#D93A6B] font-medium pt-1">
                        Stayed at: {r.propertyStayed}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#E8E2D8] flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingReview({ ...r });
                        setIsNewReviewModal(false);
                      }}
                      className="px-3 py-1.5 rounded-[8px] bg-[#FAF7F2] hover:bg-[#EAE3D6] text-xs font-medium text-[#14213D] transition-colors flex items-center gap-1.5"
                    >
                      <Edit className="w-3 h-3 text-[#14213D]" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (allReviews.length <= 1) {
                          showToast('At least one review must remain.', 'error');
                          return;
                        }
                        if (window.confirm(`Delete review from "${r.guestName}"?`)) {
                          deleteReview(r.id);
                          showToast(`Review from ${r.guestName} deleted.`);
                        }
                      }}
                      className="px-3 py-1.5 rounded-[8px] bg-red-50 hover:bg-red-100 text-xs font-medium text-red-600 transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3 h-3 text-red-600" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MEDIA & VIDEO */}
        {activeTab === 'media' && (
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-medium text-[#14213D]">
                Cinematic Video & Media Showcase
              </h2>
              <p className="text-xs text-[#2B2F3A]/70">
                Configure the primary verified video walkthrough showcased on the landing page and residence tours.
              </p>
            </div>

            <div className="space-y-4 max-w-3xl">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1.5">
                  Cloudinary / Direct Video URL (.mp4 / .webm)
                </label>
                <input
                  type="url"
                  value={configForm.videoUrl}
                  onChange={(e) => setConfigForm({ ...configForm, videoUrl: e.target.value })}
                  placeholder="https://res.cloudinary.com/..."
                  className="w-full px-4 py-3 rounded-[12px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm font-mono text-[#14213D] focus:outline-none focus:border-[#D93A6B]"
                />
                <span className="text-[11px] text-[#2B2F3A]/60 block mt-1">
                  Active Link: https://res.cloudinary.com/yvbshrkz/video/upload/v1792657573/WhatsApp_Video_2026-10-19_at_2.25.31_PM_2.mp4
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1.5">
                  Showcase Title
                </label>
                <input
                  type="text"
                  value={configForm.videoTitle}
                  onChange={(e) => setConfigForm({ ...configForm, videoTitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-[12px] bg-[#FAF7F2] border border-[#E8E2D8] text-sm text-[#14213D] focus:outline-none focus:border-[#D93A6B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1.5">
                  Showcase Subtitle / Caption
                </label>
                <textarea
                  rows={3}
                  value={configForm.videoSubtitle}
                  onChange={(e) => setConfigForm({ ...configForm, videoSubtitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-[12px] bg-[#FAF7F2] border border-[#E8E2D8] text-sm text-[#14213D] focus:outline-none focus:border-[#D93A6B]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    updateSiteConfig({
                      videoUrl: configForm.videoUrl,
                      videoTitle: configForm.videoTitle,
                      videoSubtitle: configForm.videoSubtitle,
                    });
                    showToast('Video settings saved and live synced!');
                  }}
                  className="px-6 py-3 bg-[#14213D] hover:bg-[#1E2E4F] text-[#FAF6F0] rounded-[12px] text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Save className="w-4 h-4 text-[#B89B72]" />
                  <span>Save Video Settings</span>
                </button>
              </div>

              {/* Video Live Test Preview */}
              <div className="pt-6 border-t border-[#E8E2D8]">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-3">
                  Live Video Player Preview
                </label>
                <div className="rounded-[20px] overflow-hidden bg-black aspect-video max-w-xl shadow-lg border border-[#14213D]/20">
                  <video
                    key={configForm.videoUrl}
                    src={configForm.videoUrl}
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support HTML5 video.
                  </video>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT & RECEPTION */}
        {activeTab === 'contact' && (
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-medium text-[#14213D]">
                Contact & Office Details
              </h2>
              <p className="text-xs text-[#2B2F3A]/70">
                Update reception address, 24/7 WhatsApp concierge number, email inquiries, and social links.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1.5">
                  Office & Reception Address
                </label>
                <textarea
                  rows={2}
                  value={configForm.receptionAddress}
                  onChange={(e) => setConfigForm({ ...configForm, receptionAddress: e.target.value })}
                  className="w-full px-4 py-3 rounded-[12px] bg-[#FAF7F2] border border-[#E8E2D8] text-sm text-[#14213D] focus:outline-none focus:border-[#D93A6B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1.5">
                  WhatsApp Concierge Number
                </label>
                <input
                  type="text"
                  value={configForm.whatsappNumber}
                  onChange={(e) => setConfigForm({ ...configForm, whatsappNumber: e.target.value })}
                  placeholder="+91 97691 56086"
                  className="w-full px-4 py-3 rounded-[12px] bg-[#FAF7F2] border border-[#E8E2D8] text-sm text-[#14213D] focus:outline-none focus:border-[#D93A6B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1.5">
                  Email Inquiries
                </label>
                <input
                  type="email"
                  value={configForm.email}
                  onChange={(e) => setConfigForm({ ...configForm, email: e.target.value })}
                  placeholder="info@connekthomes.in"
                  className="w-full px-4 py-3 rounded-[12px] bg-[#FAF7F2] border border-[#E8E2D8] text-sm text-[#14213D] focus:outline-none focus:border-[#D93A6B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1.5">
                  Instagram Profile Link
                </label>
                <input
                  type="url"
                  value={configForm.instagramUrl}
                  onChange={(e) => setConfigForm({ ...configForm, instagramUrl: e.target.value })}
                  placeholder="https://www.instagram.com/connekt_homes/"
                  className="w-full px-4 py-3 rounded-[12px] bg-[#FAF7F2] border border-[#E8E2D8] text-sm text-[#14213D] focus:outline-none focus:border-[#D93A6B]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  updateSiteConfig({
                    receptionAddress: configForm.receptionAddress,
                    whatsappNumber: configForm.whatsappNumber,
                    email: configForm.email,
                    instagramUrl: configForm.instagramUrl,
                    phone: configForm.whatsappNumber,
                  });
                  showToast('Contact and reception details updated successfully!');
                }}
                className="px-6 py-3 bg-[#14213D] hover:bg-[#1E2E4F] text-[#FAF6F0] rounded-[12px] text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer transition-all"
              >
                <Save className="w-4 h-4 text-[#B89B72]" />
                <span>Save Contact Details</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: BACKUP & DATA SYNC */}
        {activeTab === 'backup' && (
          <div className="space-y-8">
            {/* Card 1: Export */}
            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#14213D]">
                    1. Download Full Site Backup (.JSON)
                  </h3>
                  <p className="text-xs text-[#2B2F3A]/70">
                    Export all current rooms ({allStays.length}), customer reviews ({allReviews.length}), and site configs into a portable JSON backup file.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={handleDownloadBackup}
                  className="px-6 py-3.5 bg-[#14213D] hover:bg-[#1E2E4F] text-[#FAF6F0] rounded-[12px] text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4 text-[#B89B72]" />
                  <span>Download connekt-homes-data.json</span>
                </button>
              </div>
            </div>

            {/* Card 2: Import File */}
            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F8E1E8] text-[#D93A6B] flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#14213D]">
                    2. Import Backup File (Auto-Detect Data)
                  </h3>
                  <p className="text-xs text-[#2B2F3A]/70">
                    Upload an exported JSON file. The system will auto-detect the rooms, reviews, and media settings, and immediately populate the live site.
                  </p>
                </div>
              </div>

              <div className="p-6 border-2 border-dashed border-[#E8E2D8] rounded-[18px] bg-[#FAF7F2] text-center space-y-3">
                <Upload className="w-8 h-8 text-[#B89B72] mx-auto opacity-70" />
                <div className="text-xs font-semibold text-[#14213D]">
                  Select or drag & drop your JSON backup file
                </div>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="text-xs text-[#2B2F3A]/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#14213D] file:text-white hover:file:bg-[#1E2E4F] cursor-pointer"
                />
              </div>

              {/* Paste Raw JSON Fallback */}
              <div className="space-y-2 pt-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72]">
                  Or Paste Raw JSON String
                </label>
                <textarea
                  rows={4}
                  value={jsonPasteInput}
                  onChange={(e) => setJsonPasteInput(e.target.value)}
                  placeholder='{"stays": [...], "reviews": [...]}'
                  className="w-full px-4 py-3 rounded-[12px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs font-mono text-[#14213D] focus:outline-none focus:border-[#D93A6B]"
                />
                <button
                  onClick={handleRawJsonImport}
                  className="px-5 py-2.5 bg-[#D93A6B] hover:bg-[#c42f5d] text-white rounded-[10px] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Parse & Import Pasted Data</span>
                </button>
              </div>
            </div>

            {/* Card 3: Factory Defaults */}
            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-red-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-red-700">
                    3. Reset to Original Curated Properties
                  </h3>
                  <p className="text-xs text-[#2B2F3A]/70">
                    Restore the curated Bandra & BKC listings and real reviews if you wish to reset your customizations.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to restore the default listings and reviews? Any custom rooms you created will be reset.'
                      )
                    ) {
                      resetToDefaults();
                      showToast('Database reset to original curated listings!');
                    }
                  }}
                  className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-[10px] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Factory Defaults</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: STAY EDITOR */}
      {editingStay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-[28px] overflow-hidden shadow-2xl border border-[#E8E2D8] my-8 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-6 bg-[#14213D] text-[#FAF6F0] flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <Building className="w-5 h-5 text-[#D93A6B]" />
                <h3 className="font-serif text-xl">
                  {isNewStayModal ? 'Add New Serviced Residence' : `Edit: ${editingStay.name}`}
                </h3>
              </div>
              <button
                onClick={() => setEditingStay(null)}
                className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-[#14213D]">
              {/* Row 1: Basic Identifiers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                    Residence Name
                  </label>
                  <input
                    type="text"
                    value={editingStay.name}
                    onChange={(e) => setEditingStay({ ...editingStay, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                    Neighborhood / Area
                  </label>
                  <input
                    type="text"
                    value={editingStay.area}
                    onChange={(e) => setEditingStay({ ...editingStay, area: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                  Tagline / Short Summary
                </label>
                <input
                  type="text"
                  value={editingStay.tagline}
                  onChange={(e) => setEditingStay({ ...editingStay, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm font-medium"
                />
              </div>

              {/* Row 2: Pricing & Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                    Nightly Price (₹)
                  </label>
                  <input
                    type="number"
                    value={editingStay.pricePerNight}
                    onChange={(e) =>
                      setEditingStay({ ...editingStay, pricePerNight: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={editingStay.originalPrice || 0}
                    onChange={(e) =>
                      setEditingStay({ ...editingStay, originalPrice: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                    Cleaning Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={editingStay.cleaningFee}
                    onChange={(e) =>
                      setEditingStay({ ...editingStay, cleaningFee: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                    Size (sqft)
                  </label>
                  <input
                    type="number"
                    value={editingStay.sizeSqFt}
                    onChange={(e) =>
                      setEditingStay({ ...editingStay, sizeSqFt: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              {/* Row 3: Capacities */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                    Max Guests
                  </label>
                  <input
                    type="number"
                    value={editingStay.guests}
                    onChange={(e) =>
                      setEditingStay({ ...editingStay, guests: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={editingStay.bedrooms}
                    onChange={(e) =>
                      setEditingStay({ ...editingStay, bedrooms: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                    Beds
                  </label>
                  <input
                    type="number"
                    value={editingStay.beds}
                    onChange={(e) =>
                      setEditingStay({ ...editingStay, beds: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={editingStay.bathrooms}
                    onChange={(e) =>
                      setEditingStay({ ...editingStay, bathrooms: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              {/* UNLIMITED IMAGES & FILE UPLOADER MANAGER */}
              <div className="space-y-4 p-4 rounded-[16px] bg-[#FCFAF7] border border-[#E8E2D8]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E2D8]">
                  <div>
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#D93A6B]" />
                      <h4 className="font-serif text-base font-medium text-[#14213D]">
                        Residence Gallery ({editingStay.images.length} Photos · Unlimited)
                      </h4>
                    </div>
                    <p className="text-[11px] text-[#2B2F3A]/70">
                      Upload photos directly from your phone/computer or paste image links. Photo #1 is automatically used as the cover photo.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Device Upload Button */}
                    <label className="px-3.5 py-2 bg-[#14213D] hover:bg-[#1E2E4F] text-white rounded-[10px] text-xs font-semibold tracking-wide flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors">
                      <UploadCloud className="w-3.5 h-3.5 text-[#B89B72]" />
                      <span>{isUploadingImage ? 'Processing...' : 'Upload Photos'}</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        disabled={isUploadingImage}
                        onChange={handleImageFilesUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Toggle Bulk URLs */}
                    <button
                      type="button"
                      onClick={() => setShowBulkUrlBox(!showBulkUrlBox)}
                      className="px-3 py-2 bg-[#FAF7F2] hover:bg-[#EAE3D6] border border-[#E8E2D8] text-[#14213D] rounded-[10px] text-xs font-medium cursor-pointer transition-colors"
                    >
                      {showBulkUrlBox ? 'Hide Bulk URLs' : 'Paste URLs'}
                    </button>
                  </div>
                </div>

                {/* Single URL Quick Add Bar */}
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Paste Cloudinary / image URL (e.g. https://res.cloudinary.com/...)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSingleImageUrl();
                      }
                    }}
                    className="flex-1 px-3.5 py-2 rounded-[10px] bg-white border border-[#E8E2D8] text-xs font-mono text-[#14213D] focus:outline-none focus:border-[#D93A6B]"
                  />
                  <button
                    type="button"
                    onClick={handleAddSingleImageUrl}
                    disabled={!newImageUrl.trim()}
                    className="px-4 py-2 bg-[#D93A6B] hover:bg-[#c42f5d] disabled:opacity-50 text-white rounded-[10px] text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    Add URL
                  </button>
                </div>

                {/* Bulk URL Box (Conditional) */}
                {showBulkUrlBox && (
                  <div className="p-3 bg-white rounded-[12px] border border-[#E8E2D8] space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#B89B72]">
                      Bulk Paste Image Links (One URL per line)
                    </label>
                    <textarea
                      rows={3}
                      value={editingStay.images.join('\n')}
                      onChange={(e) => {
                        const links = e.target.value
                          .split('\n')
                          .map((l) => l.trim())
                          .filter(Boolean);
                        setEditingStay({ ...editingStay, images: links });
                      }}
                      className="w-full px-3 py-2 rounded-[8px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs font-mono text-[#14213D]"
                      placeholder="https://res.cloudinary.com/..."
                    />
                  </div>
                )}

                {/* Uploading Status Banner */}
                {isUploadingImage && (
                  <div className="p-2.5 rounded-[10px] bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Optimizing and uploading selected photos...</span>
                  </div>
                )}

                {/* Image Thumbnails & Management Grid */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-[#2B2F3A]/70 font-medium">
                    <span>Uploaded Gallery Items ({editingStay.images.length})</span>
                    <span>Drag or use arrows to reorder · Click ★ to set cover</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-72 overflow-y-auto p-1">
                    {editingStay.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`relative rounded-[12px] overflow-hidden border group bg-white shadow-xs ${
                          idx === 0 ? 'border-[#D93A6B] ring-2 ring-[#D93A6B]/30' : 'border-[#E8E2D8]'
                        }`}
                      >
                        <div className="aspect-[4/3] bg-[#14213D] overflow-hidden relative">
                          <img
                            src={img}
                            alt={`Photo ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />

                          {/* Index Badge */}
                          <div
                            className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold shadow-xs ${
                              idx === 0
                                ? 'bg-[#D93A6B] text-white'
                                : 'bg-black/70 text-white backdrop-blur-xs'
                            }`}
                          >
                            {idx === 0 ? '★ Cover' : `#${idx + 1}`}
                          </div>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            title="Remove photo"
                            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Reorder and Make Cover Controls */}
                        <div className="p-1.5 bg-[#FCFAF7] border-t border-[#E8E2D8] flex items-center justify-between gap-1 text-[10px]">
                          <div className="flex items-center gap-0.5">
                            <button
                              type="button"
                              onClick={() => handleMoveImage(idx, 'left')}
                              disabled={idx === 0}
                              title="Move left"
                              className="p-1 rounded hover:bg-white text-[#14213D] disabled:opacity-20 cursor-pointer"
                            >
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveImage(idx, 'right')}
                              disabled={idx === editingStay.images.length - 1}
                              title="Move right"
                              className="p-1 rounded hover:bg-white text-[#14213D] disabled:opacity-20 cursor-pointer"
                            >
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>

                          {idx !== 0 ? (
                            <button
                              type="button"
                              onClick={() => handleSetCoverImage(idx)}
                              className="px-1.5 py-0.5 rounded bg-white hover:bg-[#FAF7F2] border border-[#E8E2D8] text-[9px] font-semibold text-[#14213D] cursor-pointer"
                            >
                              Make Cover
                            </button>
                          ) : (
                            <span className="text-[9px] font-bold text-[#D93A6B] px-1">Active Cover</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Space Breakdown Section */}
              <div className="space-y-4 pt-4 border-t border-[#E8E2D8]">
                <h4 className="font-serif text-lg font-medium text-[#14213D]">
                  Detailed Space Breakdown (Matches Video Tour)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                      Living Room Details
                    </label>
                    <textarea
                      rows={2}
                      value={editingStay.spaceBreakdown?.livingRoom || ''}
                      onChange={(e) =>
                        setEditingStay({
                          ...editingStay,
                          spaceBreakdown: {
                            ...editingStay.spaceBreakdown,
                            livingRoom: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                      Bedroom 1 Details
                    </label>
                    <textarea
                      rows={2}
                      value={editingStay.spaceBreakdown?.bedroom1 || ''}
                      onChange={(e) =>
                        setEditingStay({
                          ...editingStay,
                          spaceBreakdown: {
                            ...editingStay.spaceBreakdown,
                            bedroom1: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                      Bedroom 2 Details (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={editingStay.spaceBreakdown?.bedroom2 || ''}
                      onChange={(e) =>
                        setEditingStay({
                          ...editingStay,
                          spaceBreakdown: {
                            ...editingStay.spaceBreakdown,
                            bedroom2: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                      Kitchen & Appliances
                    </label>
                    <textarea
                      rows={2}
                      value={editingStay.spaceBreakdown?.kitchen || ''}
                      onChange={(e) =>
                        setEditingStay({
                          ...editingStay,
                          spaceBreakdown: {
                            ...editingStay.spaceBreakdown,
                            kitchen: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                      Bathrooms & Hot Water
                    </label>
                    <textarea
                      rows={2}
                      value={editingStay.spaceBreakdown?.bathrooms || ''}
                      onChange={(e) =>
                        setEditingStay({
                          ...editingStay,
                          spaceBreakdown: {
                            ...editingStay.spaceBreakdown,
                            bathrooms: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                      Housekeeping & Amenities Note
                    </label>
                    <textarea
                      rows={2}
                      value={editingStay.spaceBreakdown?.amenitiesNotes || ''}
                      onChange={(e) =>
                        setEditingStay({
                          ...editingStay,
                          spaceBreakdown: {
                            ...editingStay.spaceBreakdown,
                            amenitiesNotes: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                  Full Story Description
                </label>
                <textarea
                  rows={3}
                  value={editingStay.description}
                  onChange={(e) =>
                    setEditingStay({ ...editingStay, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm"
                />
              </div>

              {/* Concierge Note */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                  On-Ground Concierge Note
                </label>
                <input
                  type="text"
                  value={editingStay.conciergeNote}
                  onChange={(e) =>
                    setEditingStay({ ...editingStay, conciergeNote: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-5 bg-[#FAF7F2] border-t border-[#E8E2D8] flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setEditingStay(null)}
                className="px-5 py-2.5 rounded-[10px] bg-white border border-[#E8E2D8] text-xs font-semibold text-[#14213D] hover:bg-[#F2ECE4] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isNewStayModal) {
                    addStay(editingStay);
                    showToast(`Added new residence: "${editingStay.name}"`);
                  } else {
                    updateStay(editingStay.id, editingStay);
                    showToast(`Updated "${editingStay.name}"`);
                  }
                  setEditingStay(null);
                }}
                className="px-6 py-2.5 rounded-[10px] bg-[#14213D] hover:bg-[#1E2E4F] text-white text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#D93A6B]" />
                <span>Save Residence</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REVIEW EDITOR */}
      {editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-[24px] overflow-hidden shadow-2xl border border-[#E8E2D8]">
            <div className="p-5 bg-[#14213D] text-[#FAF6F0] flex items-center justify-between border-b border-white/10">
              <h3 className="font-serif text-lg">
                {isNewReviewModal ? 'Add Verified Guest Review' : 'Edit Guest Review'}
              </h3>
              <button
                onClick={() => setEditingReview(null)}
                className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-[#14213D]">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                  Guest Full Name
                </label>
                <input
                  type="text"
                  value={editingReview.guestName}
                  onChange={(e) =>
                    setEditingReview({ ...editingReview, guestName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                    Rating (1 - 5)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={editingReview.rating}
                    onChange={(e) =>
                      setEditingReview({ ...editingReview, rating: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                    Stay Date / Month
                  </label>
                  <input
                    type="text"
                    value={editingReview.stayDate}
                    onChange={(e) =>
                      setEditingReview({ ...editingReview, stayDate: e.target.value })
                    }
                    placeholder="e.g. October 2026"
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                  Property Stayed
                </label>
                <select
                  value={editingReview.propertyStayed || ''}
                  onChange={(e) =>
                    setEditingReview({ ...editingReview, propertyStayed: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm font-medium"
                >
                  {allStays.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B89B72] mb-1">
                  Review Text / Comment
                </label>
                <textarea
                  rows={4}
                  value={editingReview.comment}
                  onChange={(e) =>
                    setEditingReview({ ...editingReview, comment: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="p-4 bg-[#FAF7F2] border-t border-[#E8E2D8] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingReview(null)}
                className="px-4 py-2 rounded-[8px] bg-white border border-[#E8E2D8] text-xs font-semibold text-[#14213D] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isNewReviewModal) {
                    addReview(editingReview);
                    showToast(`Added review from ${editingReview.guestName}`);
                  } else {
                    updateReview(editingReview.id, editingReview);
                    showToast(`Updated review from ${editingReview.guestName}`);
                  }
                  setEditingReview(null);
                }}
                className="px-5 py-2 rounded-[8px] bg-[#14213D] hover:bg-[#1E2E4F] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-[#B89B72]" />
                <span>Save Review</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
