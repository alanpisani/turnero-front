interface PaginatorProps {
  totalPages: number;
  page: number;
  setPage: (n: number) => void;
}

export default function Paginator({
  totalPages,
  setPage,
  page,
}: PaginatorProps) {
  return (
    totalPages > 1 && (
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ← Anterior
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Siguiente →
        </button>
      </div>
    )
  );
}
