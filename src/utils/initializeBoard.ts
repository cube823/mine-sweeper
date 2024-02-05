export const initializeBoard = (rows: number, columns: number, mines?: number) => {
  return Array.from({ length: columns }, () => Array(rows).fill({ type: 'veiled', isMine: false }))
}
