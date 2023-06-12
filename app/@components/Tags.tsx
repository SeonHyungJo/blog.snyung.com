type ContentTagsProps = {
  tags: string[]
}

export default function Tags({ tags }: ContentTagsProps) {
  return (
    <>
      {tags.map((tag) => (
        <button key={tag} className='px-2 py-1 text-sm border-none rounded-lg outline-none text-slate-500 bg-slate-200 whitespace-nowrap'>
          {tag}
        </button>
      ))}
    </>
  )
}