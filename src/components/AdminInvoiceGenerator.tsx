'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Printer, MapPin, Phone, Mail, Leaf, Save, FileText, CheckCircle2, FilePlus, AlertTriangle } from 'lucide-react';

interface RowItem {
  id: string;
  date: string;
  day: string;
  description: string;
  visitType: string;
  homeCharges: number | string;
  physioCharges: number | string;
  totalOverride?: number | string;
}

interface SavedInvoice {
  id: string;
  title: string;
  updatedAt: string;
  headerInfo: any;
  details: any;
  items: RowItem[];
  notes: string[];
  paymentDetails: any;
  overrideTotalHome: string;
  overrideTotalPhysio: string;
  overrideGrandTotal: string;
  overrideWords: string;
  doctorSig: any;
}

function numberToWords(num: number): string {
  if (isNaN(num) || num === 0) return '';
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const inWords = (n: number): string => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
    if (n < 1000) return a[Math.floor(n / 100)] + 'Hundred ' + (n % 100 !== 0 ? inWords(n % 100) : '');
    if (n < 100000) return inWords(Math.floor(n / 1000)) + 'Thousand ' + (n % 1000 !== 0 ? inWords(n % 1000) : '');
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + 'Lakh ' + (n % 100000 !== 0 ? inWords(n % 100000) : '');
    return inWords(Math.floor(n / 10000000)) + 'Crore ' + (n % 10000000 !== 0 ? inWords(n % 10000000) : '');
  };

  return `${inWords(Math.floor(num)).trim()} Rupees Only`;
}

const defaultHeaderInfo = {
  address: 'Neeti Heritage, Nande, Pune-412115',
  phone: '+91 9322518895',
  email: 'drbhagyashrisalunkept@gmail.com',
  invoiceNo: '',
  invoiceDate: '',
  placeOfService: 'Pune',
  dueDate: '',
  motto: 'Your Health, Our Priority',
};

const defaultDetails = {
  patientName: '',
  idLabel: 'Patient ID',
  patientId: '',
  ageGender: '',
  address: '',
  physiotherapist: 'Dr. Bhagyashri Salunke (PT)',
  contactNo: '+91 9322518895',
  treatmentPlan: '',
  totalSessionsPrescribed: '',
};

const defaultNotes = [
  'Please make payments before or on the due date.',
  'Retain this receipt for insurance reimbursement purposes.',
  'For cancellations, please notify at least 24 hours in advance.',
];

const defaultPaymentDetails = {
  bankName: 'HDFC Bank',
  accountName: 'BHAGYASHRI SUNILRAO SALUNKE',
  accountNo: '50100804057876',
  ifscCode: 'HDFC0002681',
  upiId: 'drbhagyashriphysio@ybl',
};

const defaultDoctorSig = {
  name: 'Dr. Bhagyashri Salunke (PT)',
  title: 'Physiotherapist & Rehabilitation Specialist',
  regNo: 'Reg. No. PT/71210',
};

export default function AdminInvoiceGenerator() {
  const [savedInvoices, setSavedInvoices] = useState<SavedInvoice[]>([]);
  const [currentInvoiceId, setCurrentInvoiceId] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  const [headerInfo, setHeaderInfo] = useState(defaultHeaderInfo);
  const [details, setDetails] = useState(defaultDetails);
  const [items, setItems] = useState<RowItem[]>([]);
  const [notes, setNotes] = useState(defaultNotes);
  const [paymentDetails, setPaymentDetails] = useState(defaultPaymentDetails);
  const [overrideTotalHome, setOverrideTotalHome] = useState<string>('');
  const [overrideTotalPhysio, setOverrideTotalPhysio] = useState<string>('');
  const [overrideGrandTotal, setOverrideGrandTotal] = useState<string>('');
  const [overrideWords, setOverrideWords] = useState<string>('');
  const [doctorSig, setDoctorSig] = useState(defaultDoctorSig);

  useEffect(() => {
    setCurrentInvoiceId(Date.now().toString());
  }, []);

  useEffect(() => {
    const loaded = localStorage.getItem('physio_invoices');
    if (loaded) {
      try {
        const parsed = JSON.parse(loaded);
        setSavedInvoices(parsed);
      } catch (e) {
        console.error('Failed to parse saved invoices', e);
      }
    }
  }, []);

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSaveInvoice = () => {
    const activeId = currentInvoiceId || Date.now().toString();
    const namePart = details.patientName.trim() || 'Unnamed Patient';
    const invNoPart = headerInfo.invoiceNo.trim() ? `#${headerInfo.invoiceNo.trim()}` : `ID-${activeId.slice(-4)}`;
    const title = `${namePart} - ${invNoPart}`;

    const updatedInvoice: SavedInvoice = {
      id: activeId,
      title,
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      headerInfo,
      details,
      items,
      notes,
      paymentDetails,
      overrideTotalHome,
      overrideTotalPhysio,
      overrideGrandTotal,
      overrideWords,
      doctorSig,
    };

    const existingIndex = savedInvoices.findIndex((inv) => inv.id === activeId);
    let updatedList: SavedInvoice[];
    if (existingIndex >= 0) {
      updatedList = [...savedInvoices];
      updatedList[existingIndex] = updatedInvoice;
    } else {
      updatedList = [updatedInvoice, ...savedInvoices];
    }

    setSavedInvoices(updatedList);
    localStorage.setItem('physio_invoices', JSON.stringify(updatedList));
    triggerToast();
  };

  const handleSelectInvoice = (inv: SavedInvoice) => {
    setCurrentInvoiceId(inv.id);
    setHeaderInfo(inv.headerInfo || defaultHeaderInfo);
    setDetails(inv.details || defaultDetails);
    setItems(inv.items || []);
    setNotes(inv.notes || defaultNotes);
    setPaymentDetails(inv.paymentDetails || defaultPaymentDetails);
    setOverrideTotalHome(inv.overrideTotalHome || '');
    setOverrideTotalPhysio(inv.overrideTotalPhysio || '');
    setOverrideGrandTotal(inv.overrideGrandTotal || '');
    setOverrideWords(inv.overrideWords || '');
    setDoctorSig(inv.doctorSig || defaultDoctorSig);
  };

  const handleCreateNewInvoice = () => {
    const newId = Date.now().toString();
    setCurrentInvoiceId(newId);
    setHeaderInfo(defaultHeaderInfo);
    setDetails(defaultDetails);
    setItems([]);
    setNotes(defaultNotes);
    setPaymentDetails(defaultPaymentDetails);
    setOverrideTotalHome('');
    setOverrideTotalPhysio('');
    setOverrideGrandTotal('');
    setOverrideWords('');
    setDoctorSig(defaultDoctorSig);
  };

  const openDeleteModal = (inv: SavedInvoice, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteTarget({ id: inv.id, title: inv.title });
  };

  const confirmDeleteInvoice = () => {
    if (!deleteTarget) return;
    const targetId = deleteTarget.id;
    const updatedList = savedInvoices.filter((inv) => inv.id !== targetId);
    setSavedInvoices(updatedList);
    localStorage.setItem('physio_invoices', JSON.stringify(updatedList));

    if (currentInvoiceId === targetId) {
      handleCreateNewInvoice();
    }
    setDeleteTarget(null);
  };

  const calculatedHome = useMemo(() => items.reduce((acc, item) => acc + (Number(item.homeCharges) || 0), 0), [items]);
  const calculatedPhysio = useMemo(() => items.reduce((acc, item) => acc + (Number(item.physioCharges) || 0), 0), [items]);
  const calculatedGrandTotal = useMemo(() => {
    return items.reduce((acc, item) => {
      const rowCalc = (Number(item.homeCharges) || 0) + (Number(item.physioCharges) || 0);
      const rowVal = item.totalOverride !== undefined && item.totalOverride !== '' ? Number(item.totalOverride) : rowCalc;
      return acc + (isNaN(rowVal) ? 0 : rowVal);
    }, 0);
  }, [items]);

  const totalHomeCharges = overrideTotalHome !== '' ? overrideTotalHome : calculatedHome || '';
  const totalPhysioCharges = overrideTotalPhysio !== '' ? overrideTotalPhysio : calculatedPhysio || '';
  const grandTotal = overrideGrandTotal !== '' ? overrideGrandTotal : calculatedGrandTotal || '';

  const autoWords = useMemo(() => {
    const val = Number(grandTotal);
    return isNaN(val) ? '' : numberToWords(val);
  }, [grandTotal]);

  const amountInWords = overrideWords !== '' ? overrideWords : autoWords;

  const handleItemChange = (id: string, field: keyof RowItem, value: any) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const addItem = () => {
    if (items.length >= 12) return;
    const newItem: RowItem = {
      id: Date.now().toString(),
      date: '',
      day: '',
      description: '',
      visitType: '',
      homeCharges: '',
      physioCharges: '',
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-2 md:p-6 flex flex-col md:flex-row gap-6 justify-center font-sans relative">
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          html,
          body {
            width: 210mm !important;
            height: 297mm !important;
            background: #fff !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .invoice-card {
            width: 210mm !important;
            height: 297mm !important;
            max-width: 210mm !important;
            max-height: 297mm !important;
            border: none !important;
            box-shadow: none !important;
            padding: 8mm 12mm 8mm 12mm !important;
            margin: 0 !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-500 animate-in fade-in slide-in-from-top-4 duration-200 print:hidden">
          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
          <span className="text-xs font-semibold">Invoice saved successfully!</span>
        </div>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 print:hidden">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl border border-slate-100 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Delete Invoice?</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Are you sure you want to delete <strong className="text-slate-700">{deleteTarget.title}</strong>? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteInvoice}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar - Saved Invoices */}
      <div className="w-full md:w-64 bg-white p-4 rounded-xl shadow-xs print:hidden shrink-0 h-fit space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="font-bold text-[#003366] text-sm flex items-center gap-1.5">
            <FileText className="w-4 h-4" /> Saved Invoices
          </h2>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
            {savedInvoices.length}
          </span>
        </div>

        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-0.5">
          {savedInvoices.length === 0 ? (
            <p className="text-xs text-slate-400 italic text-center py-4">No saved invoices yet.</p>
          ) : (
            savedInvoices.map((inv) => (
              <div
                key={inv.id}
                onClick={() => handleSelectInvoice(inv)}
                className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex justify-between items-center ${
                  inv.id === currentInvoiceId ? 'border-[#003366] bg-blue-50/60 font-semibold shadow-2xs' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="truncate pr-2">
                  <div className="truncate text-slate-800 font-medium">{inv.title}</div>
                  <div className="text-[10px] text-slate-400 font-normal mt-0.5">{inv.updatedAt}</div>
                </div>
                <button
                  onClick={(e) => openDeleteModal(inv, e)}
                  className="text-slate-300 hover:text-rose-600 p-1 rounded-md transition-colors"
                  title="Delete Invoice"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 max-w-[820px] flex flex-col items-center">
        {/* Top Control Bar */}
        <div className="w-full mb-4 flex flex-wrap gap-2 justify-between items-center bg-white p-3.5 rounded-xl shadow-xs print:hidden">
          <div>
            <h1 className="text-base font-bold text-slate-800">PhysioCare Invoice Editor</h1>
            <p className="text-[11px] text-slate-500">Rows: {items.length}/12 Active</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCreateNewInvoice}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <FilePlus className="w-3.5 h-3.5" /> New Invoice
            </button>
            <button
              onClick={addItem}
              disabled={items.length >= 12}
              className="flex items-center gap-1.5 bg-teal-50 text-[#008080] border border-teal-200 hover:bg-teal-100 disabled:opacity-40 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Row
            </button>
            <button
              onClick={handleSaveInvoice}
              className="flex items-center gap-1.5 bg-[#008080] hover:bg-[#006666] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" /> Save
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-[#003366] hover:bg-[#002244] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Wrapper for Mobile View */}
        <div className="w-full overflow-x-auto pb-4">
          {/* Printable Invoice Sheet */}
          <div className="invoice-card min-w-[820px] w-[820px] min-h-[1120px] bg-white p-2 shadow-md text-slate-800 text-[11px] leading-tight flex flex-col justify-between box-border mx-auto">
            <div>
              {/* Header */}
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-2 items-center pb-2 border-b-2 border-[#003366] mb-2">
                  {/* Logo Section with blend mode to eliminate background rectangle */}
                  <div className="flex justify-start items-center">
                    <Image 
                      src="/logo.png" 
                      alt="PhysioCare Logo" 
                      width={180} 
                      height={50} 
                      priority 
                      className="object-contain h-auto mix-blend-multiply filter contrast-125 brightness-105" 
                    />
                  </div>
                  
                  {/* Contact Section */}
                  <div className="flex justify-end">
                    <div className="w-52 text-[11px] font-medium text-slate-700 space-y-0.5">
                      {/* Address */}
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 flex items-center justify-center shrink-0 text-[#003366]">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="text"
                          placeholder="Address"
                          value={headerInfo.address}
                          onChange={(e) => setHeaderInfo({ ...headerInfo, address: e.target.value })}
                          className="w-full bg-transparent focus:outline-none hover:bg-slate-50/80 rounded px-1 py-0 border-0 text-slate-700 font-normal tracking-tight truncate leading-none"
                        />
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 flex items-center justify-center shrink-0 text-[#003366]">
                          <Phone className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="text"
                          placeholder="Phone"
                          value={headerInfo.phone}
                          onChange={(e) => setHeaderInfo({ ...headerInfo, phone: e.target.value })}
                          className="w-full bg-transparent focus:outline-none hover:bg-slate-50/80 rounded px-1 py-0 border-0 text-slate-700 font-normal tracking-tight leading-none"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 flex items-center justify-center shrink-0 text-[#003366]">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="text"
                          placeholder="Email"
                          value={headerInfo.email}
                          onChange={(e) => setHeaderInfo({ ...headerInfo, email: e.target.value })}
                          className="w-full bg-transparent focus:outline-none hover:bg-slate-50/80 rounded px-1 py-0 border-0 text-slate-700 font-normal tracking-tight leading-none truncate"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-lg font-black text-[#003366] tracking-tight">PHYSIOTHERAPY BILL</h2>
                    <div className="flex items-center gap-1 text-[#003366] text-[10px] font-semibold">
                      <Leaf className="w-3 h-3 text-[#008080]" />
                      <input
                        type="text"
                        placeholder="Tagline / Motto"
                        value={headerInfo.motto}
                        onChange={(e) => setHeaderInfo({ ...headerInfo, motto: e.target.value })}
                        className="focus:outline-none hover:bg-slate-50 w-40"
                      />
                    </div>
                    <div className="w-8 h-0.5 bg-[#2563EB] mt-0.5 rounded-full"></div>
                  </div>

                  {/* Invoice No Block */}
                  <div className="text-[10.5px] space-y-0 font-medium text-[#003366] w-52">
                    <div className="grid grid-cols-[95px_10px_1fr] items-center">
                      <span className="font-semibold text-slate-800">Invoice No.</span>
                      <span>:</span>
                      <input type="text" placeholder="Invoice No." value={headerInfo.invoiceNo} onChange={(e) => setHeaderInfo({ ...headerInfo, invoiceNo: e.target.value })} className="font-bold text-left focus:outline-none hover:bg-slate-50" />
                    </div>
                    <div className="grid grid-cols-[95px_10px_1fr] items-center">
                      <span className="font-semibold text-slate-800">Invoice Date</span>
                      <span>:</span>
                      <input type="text" placeholder="Date" value={headerInfo.invoiceDate} onChange={(e) => setHeaderInfo({ ...headerInfo, invoiceDate: e.target.value })} className="text-left focus:outline-none hover:bg-slate-50" />
                    </div>
                    <div className="grid grid-cols-[95px_10px_1fr] items-center">
                      <span className="font-semibold text-slate-800">Place of Service</span>
                      <span>:</span>
                      <input type="text" placeholder="Place" value={headerInfo.placeOfService} onChange={(e) => setHeaderInfo({ ...headerInfo, placeOfService: e.target.value })} className="text-left focus:outline-none hover:bg-slate-50" />
                    </div>
                    <div className="grid grid-cols-[95px_10px_1fr] items-center">
                      <span className="font-semibold text-slate-800">Due Date</span>
                      <span>:</span>
                      <input type="text" placeholder="Due Date" value={headerInfo.dueDate} onChange={(e) => setHeaderInfo({ ...headerInfo, dueDate: e.target.value })} className="text-left focus:outline-none hover:bg-slate-50" />
                    </div>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="border border-[#2563EB]/40 rounded-lg p-2.5 bg-white text-[10.5px] grid grid-cols-2 gap-x-6 text-[#003366]">
                  <div className="space-y-1">
                    <div className="grid grid-cols-[110px_12px_1fr] items-center">
                      <span className="font-bold text-slate-900 leading-none">Patient Name</span>
                      <span className="text-slate-600 font-bold leading-none text-center">:</span>
                      <input type="text" placeholder="Patient Name" value={details.patientName} onChange={(e) => setDetails({ ...details, patientName: e.target.value })} className="font-bold text-slate-900 w-full focus:outline-none hover:bg-slate-50 px-1 py-0.5 rounded leading-none" />
                    </div>
                    <div className="grid grid-cols-[110px_12px_1fr] items-center">
                      <select value={details.idLabel} onChange={(e) => setDetails({ ...details, idLabel: e.target.value })} className="font-bold text-slate-900 bg-transparent focus:outline-none hover:bg-slate-50 cursor-pointer border-none p-0 m-0 appearance-none leading-none w-full shadow-none outline-none">
                        <option value="Patient ID">Patient ID</option>
                        <option value="MRD ID">MRD ID</option>
                        <option value="OPD ID">OPD ID</option>
                      </select>
                      <span className="text-slate-600 font-bold leading-none text-center">:</span>
                      <input type="text" placeholder="ID Value" value={details.patientId} onChange={(e) => setDetails({ ...details, patientId: e.target.value })} className="w-full focus:outline-none hover:bg-slate-50 font-medium px-1 py-0.5 rounded leading-none text-slate-900" />
                    </div>
                    <div className="grid grid-cols-[110px_12px_1fr] items-center">
                      <span className="font-bold text-slate-900 leading-none">Age / Gender</span>
                      <span className="text-slate-600 font-bold leading-none text-center">:</span>
                      <input type="text" placeholder="Age / Gender" value={details.ageGender} onChange={(e) => setDetails({ ...details, ageGender: e.target.value })} className="w-full focus:outline-none hover:bg-slate-50 font-medium px-1 py-0.5 rounded leading-none text-slate-900" />
                    </div>
                    <div className="grid grid-cols-[110px_12px_1fr] items-start">
                      <span className="font-bold text-slate-900 pt-1 leading-none">Address</span>
                      <span className="text-slate-600 font-bold pt-1 leading-none text-center">:</span>
                      <textarea rows={2} placeholder="Address" value={details.address} onChange={(e) => setDetails({ ...details, address: e.target.value })} className="w-full focus:outline-none hover:bg-slate-50 font-medium resize-none bg-transparent leading-tight px-1 py-0.5 rounded text-slate-900" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="grid grid-cols-[130px_12px_1fr] items-center">
                      <span className="font-bold text-slate-900 leading-none">Physiotherapist</span>
                      <span className="text-slate-600 font-bold leading-none text-center">:</span>
                      <input type="text" placeholder="Physio Name" value={details.physiotherapist} onChange={(e) => setDetails({ ...details, physiotherapist: e.target.value })} className="font-bold text-[#003366] w-full focus:outline-none hover:bg-slate-50 px-1 py-0.5 rounded leading-none" />
                    </div>
                    <div className="grid grid-cols-[130px_12px_1fr] items-center">
                      <span className="font-bold text-slate-900 leading-none">Contact No.</span>
                      <span className="text-slate-600 font-bold leading-none text-center">:</span>
                      <input type="text" placeholder="Contact No." value={details.contactNo} onChange={(e) => setDetails({ ...details, contactNo: e.target.value })} className="w-full focus:outline-none hover:bg-slate-50 font-medium px-1 py-0.5 rounded leading-none text-slate-900" />
                    </div>
                    <div className="grid grid-cols-[130px_12px_1fr] items-start">
                      <span className="font-bold text-slate-900 pt-1 leading-none">Treatment Plan</span>
                      <span className="text-slate-600 font-bold pt-1 leading-none text-center">:</span>
                      <textarea rows={2} placeholder="Treatment Plan Details" value={details.treatmentPlan} onChange={(e) => setDetails({ ...details, treatmentPlan: e.target.value })} className="w-full focus:outline-none hover:bg-slate-50 font-medium resize-none bg-transparent leading-tight px-1 py-0.5 rounded text-slate-900" />
                    </div>
                    <div className="grid grid-cols-[130px_12px_1fr] items-center pt-0.5">
                      <span className="font-bold text-slate-900 leading-none">Total Prescribed</span>
                      <span className="text-slate-600 font-bold leading-none text-center">:</span>
                      <input type="text" placeholder="Sessions" value={details.totalSessionsPrescribed} onChange={(e) => setDetails({ ...details, totalSessionsPrescribed: e.target.value })} className="font-bold text-[#003366] focus:outline-none hover:bg-slate-50 px-1 py-0.5 rounded leading-none w-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <table className="w-full text-[10.5px] text-left border-collapse mb-4">
                <thead>
                  <tr className="bg-[#003366] text-white text-center font-semibold">
                    <th className="py-1.5 px-1 border border-[#003366] w-8">S. No.</th>
                    <th className="py-1.5 px-1 border border-[#003366] w-20">Date</th>
                    <th className="py-1.5 px-1 border border-[#003366] w-16">Day</th>
                    <th className="py-1.5 px-2 border border-[#003366] text-left">Session / Description</th>
                    <th className="py-1.5 px-1 border border-[#003366] w-20">Type of Visit</th>
                    <th className="py-1.5 px-1 border border-[#003366] w-20">Home Visit (₹)</th>
                    <th className="py-1.5 px-1 border border-[#003366] w-20">Physio Fee (₹)</th>
                    <th className="py-1.5 px-1 border border-[#003366] w-20">Total (₹)</th>
                    <th className="py-1.5 px-0.5 border border-[#003366] w-5 print:hidden"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr className="border border-blue-200 text-center text-slate-400">
                      <td colSpan={9} className="py-4 text-xs italic">
                        No sessions added yet. Click <strong>"Add Row"</strong> above to begin.
                      </td>
                    </tr>
                  ) : (
                    items.map((item, index) => {
                      const rowCalc = (Number(item.homeCharges) || 0) + (Number(item.physioCharges) || 0);
                      const rowTotal = item.totalOverride !== undefined && item.totalOverride !== '' ? item.totalOverride : rowCalc > 0 ? rowCalc : '';
                      const isCompact = items.length > 10;
                      return (
                        <tr key={item.id} className="border border-blue-200 text-center text-slate-800">
                          <td className={`${isCompact ? 'py-0.5' : 'py-1'} px-1 border-r border-blue-200`}>{index + 1}</td>
                          <td className={`${isCompact ? 'py-0.5' : 'py-1'} px-1 border-r border-blue-200`}>
                            <input type="text" placeholder="Date" value={item.date} onChange={(e) => handleItemChange(item.id, 'date', e.target.value)} className="w-full text-center bg-transparent focus:outline-none" />
                          </td>
                          <td className={`${isCompact ? 'py-0.5' : 'py-1'} px-1 border-r border-blue-200`}>
                            <input type="text" placeholder="Day" value={item.day} onChange={(e) => handleItemChange(item.id, 'day', e.target.value)} className="w-full text-center bg-transparent focus:outline-none" />
                          </td>
                          <td className={`${isCompact ? 'py-0.5' : 'py-1'} px-2 border-r border-blue-200 text-left`}>
                            <input type="text" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} className="w-full text-left bg-transparent focus:outline-none" />
                          </td>
                          <td className={`${isCompact ? 'py-0.5' : 'py-1'} px-1 border-r border-blue-200`}>
                            <input type="text" placeholder="Visit Type" value={item.visitType} onChange={(e) => handleItemChange(item.id, 'visitType', e.target.value)} className="w-full text-center bg-transparent focus:outline-none" />
                          </td>
                          <td className={`${isCompact ? 'py-0.5' : 'py-1'} px-1 border-r border-blue-200`}>
                            <input type="number" placeholder="0" value={item.homeCharges} onChange={(e) => handleItemChange(item.id, 'homeCharges', e.target.value)} className="w-full text-center bg-transparent focus:outline-none" />
                          </td>
                          <td className={`${isCompact ? 'py-0.5' : 'py-1'} px-1 border-r border-blue-200`}>
                            <input type="number" placeholder="0" value={item.physioCharges} onChange={(e) => handleItemChange(item.id, 'physioCharges', e.target.value)} className="w-full text-center bg-transparent focus:outline-none" />
                          </td>
                          <td className={`${isCompact ? 'py-0.5' : 'py-1'} px-1 border-r border-blue-200 font-bold text-slate-900`}>
                            <input type="text" placeholder="0" value={rowTotal} onChange={(e) => handleItemChange(item.id, 'totalOverride', e.target.value)} className="w-full text-center bg-transparent font-bold focus:outline-none" />
                          </td>
                          <td className={`${isCompact ? 'py-0.5' : 'py-1'} px-0.5 print:hidden text-center`}>
                            <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-rose-600 cursor-pointer">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                  <tr className="bg-blue-50/30 font-bold border-2 border-blue-200 text-[#003366]">
                    <td colSpan={4} className="py-1.5 px-3 text-center">Total Scheduled Sessions</td>
                    <td className="py-1.5 text-center">{items.length}</td>
                    <td className="py-1.5 text-center">
                      <input type="text" placeholder="0" value={totalHomeCharges} onChange={(e) => setOverrideTotalHome(e.target.value)} className="w-full text-center bg-transparent font-bold focus:outline-none" />
                    </td>
                    <td className="py-1.5 text-center">
                      <input type="text" placeholder="0" value={totalPhysioCharges} onChange={(e) => setOverrideTotalPhysio(e.target.value)} className="w-full text-center bg-transparent font-bold focus:outline-none" />
                    </td>
                    <td className="py-1.5 text-center text-slate-900 font-black">
                      <input type="text" placeholder="0" value={grandTotal} onChange={(e) => setOverrideGrandTotal(e.target.value)} className="w-full text-center bg-transparent font-black text-slate-900 focus:outline-none" />
                    </td>
                    <td className="print:hidden"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="grid grid-cols-12 gap-5 items-start mt-auto">
              <div className="col-span-7 space-y-2.5 text-[10.5px]">
                <div>
                  <h4 className="font-bold text-[#2563EB] mb-0.5 text-xs">Notes:</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-800">
                    {notes.map((note, idx) => (
                      <li key={idx}>
                        <input
                          type="text"
                          placeholder={`Note #${idx + 1}`}
                          value={note}
                          onChange={(e) => {
                            const newNotes = [...notes];
                            newNotes[idx] = e.target.value;
                            setNotes(newNotes);
                          }}
                          className="w-11/12 bg-transparent focus:outline-none hover:bg-slate-50"
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-[#2563EB] mb-0.5 text-xs">Payment Details:</h4>
                  <div className="space-y-0.5 text-slate-800 font-medium">
                    <div className="grid grid-cols-[90px_10px_1fr] items-center">
                      <span className="text-slate-700">Bank Name</span>
                      <span>:</span>
                      <input type="text" value={paymentDetails.bankName} onChange={(e) => setPaymentDetails({ ...paymentDetails, bankName: e.target.value })} className="bg-transparent focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-[90px_10px_1fr] items-center">
                      <span className="text-slate-700">Account Name</span>
                      <span>:</span>
                      <input type="text" value={paymentDetails.accountName} onChange={(e) => setPaymentDetails({ ...paymentDetails, accountName: e.target.value })} className="bg-transparent focus:outline-none w-full" />
                    </div>
                    <div className="grid grid-cols-[90px_10px_1fr] items-center">
                      <span className="text-slate-700">Account No.</span>
                      <span>:</span>
                      <input type="text" value={paymentDetails.accountNo} onChange={(e) => setPaymentDetails({ ...paymentDetails, accountNo: e.target.value })} className="bg-transparent focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-[90px_10px_1fr] items-center">
                      <span className="text-slate-700">IFSC Code</span>
                      <span>:</span>
                      <input type="text" value={paymentDetails.ifscCode} onChange={(e) => setPaymentDetails({ ...paymentDetails, ifscCode: e.target.value })} className="bg-transparent focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-[90px_10px_1fr] items-center">
                      <span className="text-slate-700">UPI ID</span>
                      <span>:</span>
                      <input type="text" value={paymentDetails.upiId} onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })} className="bg-transparent focus:outline-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-5 space-y-2.5">
                <div className="border border-[#2563EB]/40 rounded-lg overflow-hidden text-[10.5px]">
                  <div className="p-2 bg-white space-y-1 text-slate-800 font-semibold">
                    <div className="flex justify-between items-center">
                      <span>Total Home Visit</span>
                      <div className="flex items-center gap-1">
                        <span>₹</span>
                        <input type="text" placeholder="0" value={totalHomeCharges} onChange={(e) => setOverrideTotalHome(e.target.value)} className="w-20 text-right bg-transparent font-semibold focus:outline-none" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Physio Charges</span>
                      <div className="flex items-center gap-1">
                        <span>₹</span>
                        <input type="text" placeholder="0" value={totalPhysioCharges} onChange={(e) => setOverrideTotalPhysio(e.target.value)} className="w-20 text-right bg-transparent font-semibold focus:outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#003366] text-white p-2 flex justify-between items-center font-black text-xs">
                    <span>Grand Total</span>
                    <div className="flex items-center gap-1">
                      <span>₹</span>
                      <input type="text" placeholder="0" value={grandTotal} onChange={(e) => setOverrideGrandTotal(e.target.value)} className="w-24 text-right bg-transparent font-black text-white focus:outline-none" />
                    </div>
                  </div>

                  <div className="p-2 bg-blue-50/30 text-[#003366] text-[10.5px] font-semibold space-y-1">
                    <div className="text-slate-600 font-medium">Amount in Words:</div>
                    <input type="text" placeholder="Amount in Words" value={amountInWords} onChange={(e) => setOverrideWords(e.target.value)} className="font-bold text-[#003366] w-full bg-transparent focus:outline-none hover:bg-white" />
                  </div>
                </div>

                {/* Signature Block */}
                <div className="flex flex-col items-end pt-2 space-y-0.5 text-[10.5px]">
                  <div className="h-8 w-48 border-b-2 border-slate-300 border-dashed mb-1"></div>
                  <input type="text" placeholder="Doctor Name" value={doctorSig.name} onChange={(e) => setDoctorSig({ ...doctorSig, name: e.target.value })} className="font-bold text-[#003366] text-right w-48 bg-transparent focus:outline-none" />
                  <input type="text" placeholder="Title / Designation" value={doctorSig.title} onChange={(e) => setDoctorSig({ ...doctorSig, title: e.target.value })} className="text-slate-600 text-right w-48 bg-transparent focus:outline-none" />
                  <input type="text" placeholder="Registration No." value={doctorSig.regNo} onChange={(e) => setDoctorSig({ ...doctorSig, regNo: e.target.value })} className="text-slate-600 text-right w-48 bg-transparent focus:outline-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}