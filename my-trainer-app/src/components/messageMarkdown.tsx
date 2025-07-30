function parseInline(text: string): React.ReactNode[] {
    const result: React.ReactNode[] = [];
    let remaining = text;
    let keyIndex = 0;
    while (remaining) {
        const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
        const italicMatch = remaining.match(/\*(.+?)\*/);

        if (boldMatch && (!italicMatch || boldMatch.index! < italicMatch.index!)) {
            const before = remaining.slice(0, boldMatch.index);
            if (before) result.push(before);
            result.push(<strong className="font-semibold" key={"bold" + keyIndex++}>{boldMatch[1].replace(/[*#]/g, "")}</strong>);
            remaining = remaining.slice(boldMatch.index! + boldMatch[0].length).replace(/[*#]/g, "");
        } else if (italicMatch) {
            const before = remaining.slice(0, italicMatch.index);
            if (before) result.push(before);
            result.push(<em className="italic" key={"italic" + keyIndex++}>{italicMatch[1].replace(/[*#]/g, "")}</em>);
            remaining = remaining.slice(italicMatch.index! + italicMatch[0].length).replace(/[*#]/g, "");
        } else {
            result.push(remaining);
            break;
        }
    }
    return result;
}

export default function Markdown( {markdown} : {markdown:{text:string} | string}) {

    if (typeof markdown === "string") {
    const lines =  markdown.split('\n').filter(Boolean);
        return (
        <div className="space-y-2">
            {lines.map((line, index) => {

                if (line.startsWith('#')) {
                    return <h1 className="text-xl" key={"heading" + index}>{parseInline(line.replace(/[*#]/g, ""))}</h1>;
                }
                if ((line.trimStart().startsWith("*")) &&
                    !line.trimStart().startsWith("**")) {
                    return <ul key={"list-" + index} className="list-disc pl-8">
                        <li key={"list-item-" + index}>{parseInline(line.replace(/[*#]/g, ""))}</li>
                    </ul>
                } else {
                    return <p key={index + 1}>{parseInline(line)}</p>;
                }
            })}
        </div>)
    } 
    const lines =  markdown.text.split('\n').filter(Boolean);
    return (
        <div className="space-y-2">
            {lines.map((line, index) => {

                if (line.startsWith('#')) {
                    return <h1 className="text-xl" key={"heading" + index}>{parseInline(line.replace(/[*#]/g, ""))}</h1>;
                }
                if ((line.trimStart().startsWith("*")) &&
                    !line.trimStart().startsWith("**")) {
                    return <ul key={"list-" + index} className="list-disc pl-8">
                        <li key={"list-item-" + index}>{parseInline(line.replace(/[*#]/g, ""))}</li>
                    </ul>
                } else {
                    return <p key={index + 1}>{parseInline(line)}</p>;
                }
            })}
        </div>
    );
}