import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useFileContext } from '../hooks/useFileContext';

interface TemplateSelectorProps {
  onCustomTemplateSelected: (customTemplate: string) => void;
  headers: string[];
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onCustomTemplateSelected,
  headers,
}) => {
  const {customTemplate, setCustomTemplate} = useFileContext();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  const getCursorCoordinates = (textareaElement: HTMLTextAreaElement) => {
    if (!textareaElement) return null;

    // Get the current cursor position
    const cursorPosition = textareaElement.selectionStart;

    // Create a temporary div to measure text
    const div = document.createElement('div');
    div.style.cssText = window.getComputedStyle(textareaElement).cssText;
    div.style.height = 'auto';
    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    div.style.whiteSpace = 'pre-wrap';

    // Get text before cursor
    const textBeforeCursor = customTemplate.substring(0, cursorPosition);
    const textBeforeCursorLines = textBeforeCursor.split('\n');
    const currentLineText = textBeforeCursorLines[textBeforeCursorLines.length - 1];

    // Calculate position
    const { lineHeight, paddingLeft, paddingTop } = window.getComputedStyle(textareaElement);
    const lineHeightValue = parseInt(lineHeight);
    const paddingLeftValue = parseInt(paddingLeft);
    const paddingTopValue = parseInt(paddingTop);

    const rect = textareaElement.getBoundingClientRect();
    const lines = textBeforeCursor.split('\n').length;

    document.body.appendChild(div);
    div.textContent = currentLineText;
    const textWidth = div.clientWidth;
    document.body.removeChild(div);

    return {
      x: rect.left + paddingLeftValue + textWidth,
      y: rect.top + paddingTopValue + (lines - 1) * lineHeightValue + lineHeightValue
    };
  };

  useEffect(() => {
    // Debug log
    console.log('Current template:', customTemplate);
    console.log('Show suggestions:', showSuggestions);
    console.log('Headers:', headers);
  }, [customTemplate, showSuggestions, headers]);

  const handleCustomTemplateChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setCustomTemplate(newValue);

    // Check if the last character is '@'
    if (newValue.endsWith('@')) {
      console.log('@ detected, showing suggestions');
      setShowSuggestions(true);
      setSuggestions(headers);

      if (textareaRef.current) {
        const position = getCursorCoordinates(textareaRef.current);
        console.log('Cursor position:', position);
        if (position) {
          setCursorPosition(position);
        }
      }
    } else {
      // Only hide suggestions if they're currently shown
      if (showSuggestions) {
        setShowSuggestions(false);
      }
    }
  };

  const handleSuggestionClick = (header: string) => {
    const cursorPosition = textareaRef.current?.selectionStart || 0;
    // Remove the @ symbol and add the header
    const newTemplate =
      customTemplate.slice(0, cursorPosition) +
      header +
      customTemplate.slice(cursorPosition);
    setCustomTemplate(newTemplate);
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !textareaRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="mb-4 space-y-2 text-white relative">
      <Label className="text-lg">Enter your template</Label>
      <Textarea
        ref={textareaRef}
        value={customTemplate}
        onChange={handleCustomTemplateChange}
        placeholder="Enter template (@ symbol for column headers)"
        className="min-h-[100px] resize-none"
      />
      {showSuggestions && suggestions.length > 0 && cursorPosition && (
        <ul
          ref={suggestionsRef}
          className="absolute bg-gray-800 text-white border border-gray-600 rounded-md z-50 max-h-48 overflow-y-auto w-48 shadow-lg"
          style={{
            top: `${cursorPosition.y}px`,
            left: `${cursorPosition.x}px`,
            position: 'fixed'
          }}
        >
          {suggestions.map((header) => (
            <li
              key={header}
              className="p-2 hover:bg-gray-700 cursor-pointer truncate"
              onClick={() => handleSuggestionClick(header)}
            >
              {header}
            </li>
          ))}
        </ul>
      )}
      <button
        className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        onClick={() => onCustomTemplateSelected(customTemplate)}
      >
        Apply Template
      </button>
    </div>
  );
};

export default TemplateSelector;