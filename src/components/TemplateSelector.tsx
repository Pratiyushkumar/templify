import { ChangeEvent, useState } from 'react';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

interface TemplateSelectorProps {
    templates: { [key: string]: string };
    onTemplateSelected: (template: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ templates, onTemplateSelected }) => {
    const [template, setTemplate] = useState<string>('');

    const handleTemplateChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedTemplate = event.target.value;
        setTemplate(selectedTemplate);
        onTemplateSelected(selectedTemplate);
    };

    return (
        <div className="mb-4">
            <Label>Select Template</Label>
            <select
                value={template}
                onChange={handleTemplateChange}
                className="border rounded p-2 mb-2 w-full"
            >
                <option value="">-- Select a Template --</option>
                {Object.entries(templates).map(([key, value]) => (
                    <option key={key} value={value}>
                        {key}
                    </option>
                ))}
            </select>
            <Button onClick={() => onTemplateSelected(template)} disabled={!template}>
                Process Data
            </Button>
        </div>
    );
};

export default TemplateSelector;