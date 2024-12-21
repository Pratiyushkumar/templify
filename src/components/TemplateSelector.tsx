import { ChangeEvent, useState, useRef } from 'react';
import { Label } from '../components/ui/label';
import { Textarea } from './ui/textarea';

interface TemplateSelectorProps {
  onCustomTemplateSelected: (customTemplate: string) => void;
  headers: string[];
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onCustomTemplateSelected,
  headers,
}) => {
  const [customTemplate, setCustomTemplate] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCustomTemplateChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const customTemplateValue = event.target.value;
    setCustomTemplate(customTemplateValue);

    const lastChar = customTemplateValue[customTemplateValue.length - 1];
    if (lastChar === '@') {
      setShowSuggestions(true);
      setSuggestions(headers);

      const textarea = textareaRef.current;

      if (textarea) {
        const { left, height, right } = textarea.getBoundingClientRect();
        setCursorPosition({
          x: left,
          y: height,
        });
        console.log(cursorPosition);
      }
    } else if (showSuggestions) {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (header: string) => {
    const newTemplate = customTemplate + header;
    setCustomTemplate(newTemplate);
    setShowSuggestions(false);
  };

  return (
    <div className="mb-4 space-y-2 text-white relative">
      <Label className="text-lg">Enter your template</Label>
      <Textarea
        ref={textareaRef}
        value={customTemplate}
        onChange={handleCustomTemplateChange}
        placeholder="Enter template (@ symbol for column headers)"
        style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
      />
      {showSuggestions && suggestions.length > 0 && cursorPosition && (
        <ul
          className="absolute bg-gray-800 text-white border border-gray-600 rounded-md mt-1 z-10"
          style={{
            top: cursorPosition.y,
            left: cursorPosition.x,
            maxWidth: '300px',
            overflowY: 'auto',
          }}
        >
          {suggestions.map((header) => (
            <li
              key={header}
              className="p-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => handleSuggestionClick(header)}
            >
              {header}
            </li>
          ))}
        </ul>
      )}
      <button
        className="mt-2 px-2 sm:px-4 md:px-5 py-3 border border-gray-400 rounded-lg"
        onClick={() => onCustomTemplateSelected(customTemplate)}
      >
        Apply Template
      </button>
    </div>
  );
};

export default TemplateSelector;
