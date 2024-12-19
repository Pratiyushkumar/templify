import { ChangeEvent, useState } from 'react';
import { Label } from '../components/ui/label';
import { Textarea } from './ui/textarea';

interface TemplateSelectorProps {
  onCustomTemplateSelected: (customTemplate: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onCustomTemplateSelected,
}) => {
  const [customTemplate, setCustomTemplate] = useState<string>('');

  const handleCustomTemplateChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const customTemplateValue = event.target.value;
    setCustomTemplate(customTemplateValue);
  };

  const handleApplyCustomTemplate = () => {
    if(customTemplate === '') return;
    onCustomTemplateSelected(customTemplate);
  };

  return (
    <div className='mb-4 space-y-2 text-white'>
      <Label className='text-lg'>Enter your template</Label>
      <Textarea
        value={customTemplate}
        onChange={handleCustomTemplateChange}
        placeholder='Enter template (@ symbol for column headers)'
      />
      <button className='mt-2 px-2 sm:px-4 md:px-5 py-3 border border-gray-400 rounded-lg' onClick={handleApplyCustomTemplate}>Apply Template</button>
    </div>
  );
};

export default TemplateSelector;
