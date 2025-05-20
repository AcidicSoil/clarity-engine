import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

export default function RitualLogDashboard() {
  const [log, setLog] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/ritual_manifest/spells.log.json")
      .then(res => res.json())
      .then(data => setLog(data.reverse()))
      .catch(() => setLog([]));
  }, []);

  const filtered = log.filter(
    entry =>
      entry.spell.toLowerCase().includes(search.toLowerCase()) ||
      entry.result.toLowerCase().includes(search.toLowerCase()) ||
      (entry.notes && entry.notes.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-4">📜 Ritual Manifestation Log</h2>
        <Input
          placeholder="Filter by spell, result, or notes"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-4"
        />
        <ScrollArea className="h-96">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>🕒 Time</TableCell>
                <TableCell>🔮 Spell</TableCell>
                <TableCell>✅ Result</TableCell>
                <TableCell>🗒️ Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((entry, idx) => (
                <TableRow key={idx}>
                  <TableCell>{{new Date(entry.timestamp).toLocaleString()}}</TableCell>
                  <TableCell>{{entry.spell}}</TableCell>
                  <TableCell>{{entry.result}}</TableCell>
                  <TableCell>{{entry.notes || "—"}}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
