import { SectionHeading } from "./DetailUI";

const DetailReviews = () => (
  <section className="min-w-0">
    <SectionHeading>
      <span className="text-white">Reviews</span>
    </SectionHeading>
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/60 px-5 py-8 text-center sm:px-8">
      <p className="font-semibold text-white">No reviews yet</p>
      <p className="mt-2 text-sm text-zinc-500">Member reviews and ratings will appear here.</p>
    </div>
  </section>
);

export default DetailReviews;
