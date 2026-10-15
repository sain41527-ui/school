import React from 'react';
import { FeeInvoice } from '../../types.ts';
import { ASSETS } from '../../constants/assets.ts';
import { X, Printer, CheckCircle2 } from 'lucide-react';

interface FeeReceiptModalProps {
  invoice: FeeInvoice;
  onClose: () => void;
}

export const FeeReceiptModal: React.FC<FeeReceiptModalProps> = ({ invoice, onClose }) => {
  const latestTx = invoice.transactions[invoice.transactions.length - 1] || {
    receiptNo: 'REC-DEFAULT',
    date: invoice.dueDate,
    amount: invoice.paidAmount,
    method: 'Institutional Bursar'
  };

  const handlePrint = () => {
    window.print();
  };

  const remaining = Math.max(0, invoice.amount - invoice.paidAmount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-200 my-8">
        {/* Modal Controls (No print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 no-print">
          <div>
            <h3 className="text-base font-bold text-slate-900">Official Fee Receipt</h3>
            <p className="text-xs text-slate-500">Bursar & Finance Office Receipt</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Receipt
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt */}
        <div className="p-6 my-4 bg-white border border-slate-300 rounded-xl printable-area text-xs space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-300 bg-slate-900 shrink-0">
                <img
                  src={ASSETS.schoolCrest}
                  alt="Crest"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 uppercase">Horizon Academy</h4>
                <p className="text-[10px] text-slate-500">Office of Institutional Bursar</p>
                <p className="text-[10px] text-slate-400">Tax ID: HA-991204-EDU</p>
              </div>
            </div>

            <div className="text-right">
              <span className="font-mono font-bold text-slate-900 block text-xs">
                {latestTx.receiptNo}
              </span>
              <span className="text-[10px] text-slate-500 font-mono block">
                Invoice #{invoice.invoiceNo}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                PAYMENT CONFIRMED
              </span>
            </div>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-semibold block">Student Name</span>
              <span className="font-bold text-slate-900">{invoice.studentName}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-semibold block">Class & Section</span>
              <span className="font-medium text-slate-800">{invoice.grade} ({invoice.section})</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-semibold block">Receipt Date</span>
              <span className="font-mono text-slate-800">{latestTx.date}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-semibold block">Payment Method</span>
              <span className="font-medium text-slate-800">{latestTx.method}</span>
            </div>
          </div>

          {/* Line item breakdown */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 font-semibold text-slate-700 text-[11px]">
                  <th className="p-2.5">Description</th>
                  <th className="p-2.5 text-right">Invoiced Amount</th>
                  <th className="p-2.5 text-right">Amount Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2.5 font-medium text-slate-900">
                    {invoice.feeType}
                    <span className="block text-[10px] text-slate-400">Term 2 Academic Session 2026-2027</span>
                  </td>
                  <td className="p-2.5 text-right font-mono tabular-nums text-slate-700">
                    ${invoice.amount.toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right font-mono font-bold tabular-nums text-slate-900">
                    ${invoice.paidAmount.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="space-y-1 text-right pt-2 border-t border-slate-200 font-mono">
            <div className="flex justify-between text-slate-500">
              <span>Total Assessed:</span>
              <span>${invoice.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-emerald-800">
              <span>Total Received:</span>
              <span>${invoice.paidAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-slate-900 pt-1 border-t border-slate-100">
              <span>Outstanding Balance:</span>
              <span>${remaining.toFixed(2)}</span>
            </div>
          </div>

          {/* Signature */}
          <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-[10px] text-slate-500">
            <div>
              <p>Certified institutional record.</p>
              <p>For questions contact billing@horizon.edu</p>
            </div>
            <div className="text-center">
              <div className="w-32 border-b border-slate-400 mb-1 font-serif italic text-slate-800 text-xs">
                J. Abernathy
              </div>
              <span className="font-semibold text-slate-700">Office of the Bursar</span>
            </div>
          </div>
        </div>

        {/* Footer (No print) */}
        <div className="flex justify-end pt-3 border-t border-slate-100 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
