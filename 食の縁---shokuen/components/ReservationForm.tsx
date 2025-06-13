
import React, { useState } from 'react';

interface ReservationFormData {
  date: string;
  time: string;
  notes: string;
}

interface ReservationFormProps {
  onSubmit: (formData: ReservationFormData) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) {
        alert("希望日時を必ず入力してください。");
        return;
    }
    onSubmit({ date, time, notes });
  };
  
  // Get today's date in YYYY-MM-DD format for min attribute of date input
  const today = new Date().toISOString().split('T')[0];


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="reservation-date" className="block text-sm font-medium text-stone-700 mb-1">
          希望日 <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="reservation-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={today} // Prevent selecting past dates
          required
          className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-white placeholder-stone-400
"
        />
      </div>

      <div>
        <label htmlFor="reservation-time" className="block text-sm font-medium text-stone-700 mb-1">
          希望時間 <span className="text-red-500">*</span>
        </label>
        <input
          type="time"
          id="reservation-time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-white placeholder-stone-400
"
        />
      </div>

      <div>
        <label htmlFor="reservation-notes" className="block text-sm font-medium text-stone-700 mb-1">
          備考・リクエスト事項
        </label>
        <textarea
          id="reservation-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="アレルギー情報、人数、その他伝えたいことなどがあればご記入ください。"
          className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-white placeholder-stone-400
"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
        >
          予約リクエストを送信する
        </button>
      </div>
       <p className="text-xs text-stone-500 text-center">
        これは予約リクエストです。生産者からの連絡をもって予約確定となります。
      </p>
    </form>
  );
};

export default ReservationForm;
