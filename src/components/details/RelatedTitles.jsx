import Card from "../media/MediaCard";
import { SectionHeading } from "./DetailUI";

const TitleRail = ({ title, items }) => {
  if (!items.length) return null;
  return (
    <section className="min-w-0">
      <SectionHeading>
        <span className="text-white">{title.split(" ")[0]}</span>{" "}
        <span className="text-orange-500">{title.split(" ").slice(1).join(" ")}</span>
      </SectionHeading>
      <div className="movie-scroll flex min-w-0 gap-4 overflow-x-auto px-1 pb-5 sm:gap-5">
        {items.map((item) => <Card key={`${item.media_type}-${item.id}`} item={item} />)}
      </div>
    </section>
  );
};

const DetailRelated = ({ data, type }) => {
  const collectionParts = data.collection_details?.parts
    ?.filter((part) => String(part.id) !== String(data.id))
    .map((part) => ({ ...part, media_type: "movie" })) ?? [];
  const recommendations = data.recommendations?.results
    ?.filter((item) => String(item.id) !== String(data.id))
    .map((item) => ({ ...item, media_type: type })) ?? [];
  const similar = data.similar?.results
    ?.filter((item) => String(item.id) !== String(data.id))
    .map((item) => ({ ...item, media_type: type })) ?? [];

  return (
    <div className="min-w-0 space-y-12 sm:space-y-14">
      <TitleRail title={type === "movie" ? "More in this franchise" : "More from this series"} items={collectionParts} />
      <TitleRail title="Recommended for you" items={recommendations} />
      <TitleRail title="Similar titles" items={similar} />
    </div>
  );
};

export default DetailRelated;
