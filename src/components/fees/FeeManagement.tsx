import React, { useState, useMemo } from 'react';
import { FeeInvoice, Student, UserRole, PaymentTransaction } from '../../types.ts';
import { 
  DollarSign, 
  Search, 
  Plus, 
  CreditCard, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Printer 
} from 'lucide-react';

interface FeeManagementProps {
  invoices: FeeInvoice[];
  students: Student[];
  onRecordPayment: (invoiceId: string, amount: number, method: 'Card' | 'Bank Transfer' | 'Cash' | 'Online Portal') => void;
  onAddInvoice: (newInvoice: Omit<FeeInvoice, 'id' | 'invoiceNo' | 'transactions'>) => void;
  onViewReceipt: (invoice: FeeInvoice) => void;
  currentRole: UserRole;
}

export const FeeManagement: React.FC<FeeManagementProps> = ({
  invoices,
  students,
  onRecordPayment,
  onAddInvoice,
  onViewReceipt,
  currentRole
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<FeeInvoice | null>(null);

  // Payment form state
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Bank Transfer' | 'Cash' | 'Online Portal'>('Online Portal');

  // Issue invoice form state
  const [issueData, setIssueData] = useState({
    studentId: students[0]?.id || '',
    feeType: 'Tuition Fee' as 'Tuition Fee' | 'Laboratory & Tech' | 'Transportation' | 'Annual Facilities' | 'Sports & Activities',
    amount: 3200,
    paidAmount: 0,
    dueDate: '2026-11-15',
    issueDate: '2026-10-15',
    status: 'pending' as 'paid' | 'partial' | 'pending' | 'overdue'
  });

  const totalBilled = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalCollected = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const totalOutstanding = Math.max(0, totalBilled - totalCollected);
  const collectionRate = totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0;

  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      const matchSearch =
        inv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.feeType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'all' || inv.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [invoices, searchQuery, statusFilter]);

  const handleOpenPayment = (inv: FeeInvoice) => {
    setSelectedInvoice(inv);
    setPaymentAmount(inv.amount - inv.paidAmount);
    setPaymentModalOpen(true);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;
    onRecordPayment(selectedInvoice.id, Number(paymentAmount), paymentMethod);
    setPaymentModalOpen(false);
  };

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === issueData.studentId);
    if (!st) return;

    onAddInvoice({
      studentId: st.id,
      studentName: `${st.firstName} ${st.lastName}`,
      grade: st.grade,
      section: st.section,
      feeType: issueData.feeType,
      amount: Number(issueData.amount),
      paidAmount: 0,
      dueDate: issueData.dueDate,
      issueDate: issueData.issueDate,
      status: 'pending'
    });

    setIssueModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Tuition & Accounts Receivable
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Bursar billing ledger, fee collections, and receipts · Fall Term 2026
          </p>
        </div>

        {currentRole === 'admin' && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIssueModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Issue Fee Invoice
            </button>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Invoiced</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            ${totalBilled.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Assessed across all cohorts</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Received</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-700 tabular-nums">
            ${totalCollected.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            {collectionRate}% collection rate
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Outstanding Dues</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-amber-700 tabular-nums">
            ${totalOutstanding.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Pending & overdue receivables</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active Invoices</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {invoices.length}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {invoices.filter(i => i.status === 'paid').length} fully settled
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student, invoice #, or fee type..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none text-slate-700"
          >
            <option value="all">All Payment Statuses</option>
            <option value="paid">Fully Paid</option>
            <option value="partial">Partially Paid</option>
            <option value="pending">Pending Payment</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Student & Cohort</th>
                <th className="py-3 px-4">Fee Item</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-right">Invoiced</th>
                <th className="py-3 px-4 text-right">Paid</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Receipt / Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv) => {
                  const balance = inv.amount - inv.paidAmount;
                  return (
                    <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-slate-700 tabular-nums">
                        {inv.invoiceNo}
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{inv.studentName}</div>
                        <div className="text-[10px] text-slate-400">
                          {inv.grade} - {inv.section}
                        </div>
                      </td>

                      <td className="py-3 px-4 font-medium text-slate-800">
                        {inv.feeType}
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-600 tabular-nums">
                        {inv.dueDate}
                      </td>

                      <td className="py-3 px-4 text-right font-mono font-semibold text-slate-900 tabular-nums">
                        ${inv.amount.toLocaleString()}
                      </td>

                      <td className="py-3 px-4 text-right font-mono font-semibold text-emerald-700 tabular-nums">
                        ${inv.paidAmount.toLocaleString()}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                          inv.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          inv.status === 'partial' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          inv.status === 'overdue' ? 'bg-red-50 text-red-700 border border-red-200' : 
                          'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {inv.status.toUpperCase()}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {inv.paidAmount > 0 && (
                            <button
                              onClick={() => onViewReceipt(inv)}
                              title="Print Official Payment Receipt"
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                            >
                              <Printer className="w-3.5 h-3.5 text-slate-600" />
                              Receipt
                            </button>
                          )}

                          {balance > 0 && (
                            <button
                              onClick={() => handleOpenPayment(inv)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-2xs"
                            >
                              <DollarSign className="w-3.5 h-3.5" />
                              Pay
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No matching invoices or dues found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {paymentModalOpen && selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Record Student Payment
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Collecting funds for {selectedInvoice.studentName} · Invoice #{selectedInvoice.invoiceNo}
            </p>

            <form onSubmit={handlePaymentSubmit} className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Billed:</span>
                  <span className="font-mono font-medium">${selectedInvoice.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Previously Paid:</span>
                  <span className="font-mono font-medium text-emerald-700">${selectedInvoice.paidAmount}</span>
                </div>
                <div className="flex justify-between font-bold pt-1 border-t border-slate-200">
                  <span className="text-slate-800">Remaining Balance:</span>
                  <span className="font-mono text-slate-900">
                    ${selectedInvoice.amount - selectedInvoice.paidAmount}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Payment Amount ($) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  max={selectedInvoice.amount - selectedInvoice.paidAmount}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 tabular-nums"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Payment Tender Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none"
                >
                  <option value="Online Portal">Online Portal (Verified Web Pay)</option>
                  <option value="Card">Credit / Debit Card Terminal</option>
                  <option value="Bank Transfer">Automated Clearing House / Bank Wire</option>
                  <option value="Cash">Physical Bursar Cash Counter</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPaymentModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 shadow-xs"
                >
                  Confirm & Issue Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Issue Invoice Modal */}
      {issueModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Issue Official Fee Invoice
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Assess tuition or extracurricular fees for an enrolled student.
            </p>

            <form onSubmit={handleIssueSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Student Candidate</label>
                <select
                  value={issueData.studentId}
                  onChange={(e) => setIssueData({ ...issueData, studentId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.lastName} (Roll #{s.rollNumber} - {s.grade})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Fee Category</label>
                <select
                  value={issueData.feeType}
                  onChange={(e) => setIssueData({ ...issueData, feeType: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                >
                  <option value="Tuition Fee">Tuition Fee (Quarterly)</option>
                  <option value="Laboratory & Tech">Laboratory & Technology Surcharge</option>
                  <option value="Transportation">Campus Transportation Pass</option>
                  <option value="Annual Facilities">Annual Campus Maintenance</option>
                  <option value="Sports & Activities">Varsity Athletics & Activities</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Invoice Amount ($)</label>
                  <input
                    type="number"
                    min="10"
                    required
                    value={issueData.amount}
                    onChange={(e) => setIssueData({ ...issueData, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Payment Due Date</label>
                  <input
                    type="date"
                    required
                    value={issueData.dueDate}
                    onChange={(e) => setIssueData({ ...issueData, dueDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIssueModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 shadow-xs"
                >
                  Post Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
