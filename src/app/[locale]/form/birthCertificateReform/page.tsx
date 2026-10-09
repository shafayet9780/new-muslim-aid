import FormRenderer from '@/components/forms/FormRenderer';
import { nafConfig } from '@/lib/form-configs';

export const metadata = {
  title: 'নওমুসলিমদের জন্ম নিবন্ধনে নাম পরিবর্তন — NAF',
};

export default function NafFormPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50">
      <FormRenderer config={nafConfig} hasFiles={true} />
    </div>
  );
}
