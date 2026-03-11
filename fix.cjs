const fs = require('fs');
const file = 'd:\\workflow\\workflow-ai\\src\\components\\SellerWorkflowCanvas.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("  const [activeTemplate, setActiveTemplate] = useState('template1');\n", "");

const t1Start = content.indexOf('  const renderTemplate1 = () => (');
const t2Start = content.indexOf('  const renderTemplate2 = () => (');
const t2End = content.indexOf('  return (\n    <div className="flex-1');

const inner = content.substring(t1Start + 35, t2Start).replace(/^\s*<>\n/, '').replace(/\s*<\/>\n\s*\);\n\n$/, '');

content = content.substring(0, t1Start) + content.substring(t2End);

const tabStart = content.indexOf('        {/* Template Tabs */}');
const tabEnd = content.indexOf("{activeTemplate === 'template1' ? renderTemplate1() : renderTemplate2()}");

content = content.substring(0, tabStart) + inner + content.substring(tabEnd + 74);

fs.writeFileSync(file, content, 'utf8');
console.log('Done');
