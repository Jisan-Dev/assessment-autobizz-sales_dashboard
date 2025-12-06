export default function Skeleton() {
  return Array.from({ length: 50 }).map((_, i) => (
    <tr key={i} className="animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 w-32 rounded-full bg-slate-100"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-24 rounded-full bg-slate-100"></div>
      </td>
      <td className="px-6 py-4">
        <div className="space-y-2">
          <div className="h-4 w-32 rounded-full bg-slate-100"></div>
          <div className="h-3 w-20 rounded-full bg-slate-50"></div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-16 rounded-full bg-slate-100 ml-auto"></div>
      </td>
    </tr>
  ));
}
