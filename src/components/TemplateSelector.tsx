import { ChangeEvent, useState } from 'react';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
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
    onCustomTemplateSelected(customTemplate);
  };

  return (
    <div className='mb-4 space-y-3 text-white'>
      <Label className='text-lg'>Enter Custom Template</Label>
      <Textarea
        value={customTemplate}
        onChange={handleCustomTemplateChange}
        placeholder='Enter custom template (@ symbol for column headers)'
      />
      <Button onClick={handleApplyCustomTemplate}>Apply Custom Template</Button>
    </div>
  );
};

export default TemplateSelector;
