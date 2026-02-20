export default function SectionPlaceholder({ title }) {
  return (
    <section className="bg-white p-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-1 text-sm text-muted">Section migration in progress.</p>
    </section>
  );
}
