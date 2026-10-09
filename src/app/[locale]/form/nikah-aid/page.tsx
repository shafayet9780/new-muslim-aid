import FormRenderer from '@/components/forms/FormRenderer';
import { nikahAidConfig } from '@/lib/form-configs';

export const metadata = {
  title: 'পাত্র/পাত্রীর তথ্য — নিকাহ এইড',
};

export default function NikahAidFormPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50">
      <FormRenderer config={nikahAidConfig} hasFiles={false} />
    </div>
  );
}
