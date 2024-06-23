# Preval test case

# if_outlining.md

> Static arg ops > If > If outlining
>
> From react 18
>
> The outer `if` in the siftUp function is driven by an unknown boolean
> from the push function. While tricky, it is possible to outline the
> whole `if`. Have to be careful about bindings and scopes here.
>
> As an aside, shouldn't we just inline single-use functions entirely?

## Input

`````js filename=intro
const push = function(heap, node) {
  const index$1 = heap.length;
  const tmpSaooB$1 = index$1 > 0;
  heap.push(node);
  siftUp(heap, node, index$1, tmpSaooB$1);
  return undefined;
};
const siftUp = function(heap, node, i, tmpOutlinedParam) {
  if (tmpOutlinedParam) {
    const tmpBinLhs$261 = i - 1;
    const tmpClusterSSA_parentIndex = tmpBinLhs$261 >>> 1;
    const tmpClusterSSA_parent = heap[tmpClusterSSA_parentIndex];
    const tmpBinLhs$263 = compare(tmpClusterSSA_parent, node);
    const tmpIfTest$369 = tmpBinLhs$263 > 0;
    if (tmpIfTest$369) {
      heap[tmpClusterSSA_parentIndex] = node;
      heap[i] = tmpClusterSSA_parent;
      let tmpClusterSSA_index$3 = tmpClusterSSA_parentIndex;
      let tmpClusterSSA_tmpIfTest$367 = tmpClusterSSA_parentIndex > 0;
      while ($LOOP_UNROLL_100) {
        if (tmpClusterSSA_tmpIfTest$367) {
          const tmpBinLhs$1 = tmpClusterSSA_index$3 - 1;
          const tmpClusterSSA_parentIndex$1 = tmpBinLhs$1 >>> 1;
          const tmpClusterSSA_parent$1 = heap[tmpClusterSSA_parentIndex$1];
          const tmpBinLhs$3 = compare(tmpClusterSSA_parent$1, node);
          const tmpIfTest$2 = tmpBinLhs$3 > 0;
          if (tmpIfTest$2) {
            heap[tmpClusterSSA_parentIndex$1] = node;
            heap[tmpClusterSSA_index$3] = tmpClusterSSA_parent$1;
            tmpClusterSSA_index$3 = tmpClusterSSA_parentIndex$1;
            tmpClusterSSA_tmpIfTest$367 = tmpClusterSSA_parentIndex$1 > 0;
          } else {
            return undefined;
          }
        } else {
          break;
        }
      }
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

$(push);
`````

## Pre Normal


`````js filename=intro
const push = function ($$0, $$1) {
  let heap = $$0;
  let node = $$1;
  debugger;
  const index$1 = heap.length;
  const tmpSaooB$1 = index$1 > 0;
  heap.push(node);
  siftUp(heap, node, index$1, tmpSaooB$1);
  return undefined;
};
const siftUp = function ($$0, $$1, $$2, $$3) {
  let heap$1 = $$0;
  let node$1 = $$1;
  let i = $$2;
  let tmpOutlinedParam = $$3;
  debugger;
  if (tmpOutlinedParam) {
    const tmpBinLhs$261 = i - 1;
    const tmpClusterSSA_parentIndex = tmpBinLhs$261 >>> 1;
    const tmpClusterSSA_parent = heap$1[tmpClusterSSA_parentIndex];
    const tmpBinLhs$263 = compare(tmpClusterSSA_parent, node$1);
    const tmpIfTest$369 = tmpBinLhs$263 > 0;
    if (tmpIfTest$369) {
      heap$1[tmpClusterSSA_parentIndex] = node$1;
      heap$1[i] = tmpClusterSSA_parent;
      let tmpClusterSSA_index$3 = tmpClusterSSA_parentIndex;
      let tmpClusterSSA_tmpIfTest$367 = tmpClusterSSA_parentIndex > 0;
      while ($LOOP_UNROLL_100) {
        if (tmpClusterSSA_tmpIfTest$367) {
          const tmpBinLhs$1 = tmpClusterSSA_index$3 - 1;
          const tmpClusterSSA_parentIndex$1 = tmpBinLhs$1 >>> 1;
          const tmpClusterSSA_parent$1 = heap$1[tmpClusterSSA_parentIndex$1];
          const tmpBinLhs$3 = compare(tmpClusterSSA_parent$1, node$1);
          const tmpIfTest$2 = tmpBinLhs$3 > 0;
          if (tmpIfTest$2) {
            heap$1[tmpClusterSSA_parentIndex$1] = node$1;
            heap$1[tmpClusterSSA_index$3] = tmpClusterSSA_parent$1;
            tmpClusterSSA_index$3 = tmpClusterSSA_parentIndex$1;
            tmpClusterSSA_tmpIfTest$367 = tmpClusterSSA_parentIndex$1 > 0;
          } else {
            return undefined;
          }
        } else {
          break;
        }
      }
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
$(push);
`````

## Normalized


`````js filename=intro
const push = function ($$0, $$1) {
  let heap = $$0;
  let node = $$1;
  debugger;
  const index$1 = heap.length;
  const tmpSaooB$1 = index$1 > 0;
  heap.push(node);
  siftUp(heap, node, index$1, tmpSaooB$1);
  return undefined;
};
const siftUp = function ($$0, $$1, $$2, $$3) {
  let heap$1 = $$0;
  let node$1 = $$1;
  let i = $$2;
  let tmpOutlinedParam = $$3;
  debugger;
  if (tmpOutlinedParam) {
    const tmpBinLhs$261 = i - 1;
    const tmpClusterSSA_parentIndex = tmpBinLhs$261 >>> 1;
    const tmpClusterSSA_parent = heap$1[tmpClusterSSA_parentIndex];
    const tmpBinLhs$263 = compare(tmpClusterSSA_parent, node$1);
    const tmpIfTest$369 = tmpBinLhs$263 > 0;
    if (tmpIfTest$369) {
      heap$1[tmpClusterSSA_parentIndex] = node$1;
      heap$1[i] = tmpClusterSSA_parent;
      let tmpClusterSSA_index$3 = tmpClusterSSA_parentIndex;
      let tmpClusterSSA_tmpIfTest$367 = tmpClusterSSA_parentIndex > 0;
      while ($LOOP_UNROLL_100) {
        if (tmpClusterSSA_tmpIfTest$367) {
          const tmpBinLhs$1 = tmpClusterSSA_index$3 - 1;
          const tmpClusterSSA_parentIndex$1 = tmpBinLhs$1 >>> 1;
          const tmpClusterSSA_parent$1 = heap$1[tmpClusterSSA_parentIndex$1];
          const tmpBinLhs$3 = compare(tmpClusterSSA_parent$1, node$1);
          const tmpIfTest$2 = tmpBinLhs$3 > 0;
          if (tmpIfTest$2) {
            heap$1[tmpClusterSSA_parentIndex$1] = node$1;
            heap$1[tmpClusterSSA_index$3] = tmpClusterSSA_parent$1;
            tmpClusterSSA_index$3 = tmpClusterSSA_parentIndex$1;
            tmpClusterSSA_tmpIfTest$367 = tmpClusterSSA_parentIndex$1 > 0;
          } else {
            return undefined;
          }
        } else {
          break;
        }
      }
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
$(push);
`````

## Output


`````js filename=intro
const push = function ($$0, $$1) {
  const heap = $$0;
  const node = $$1;
  debugger;
  const index$1 = heap.length;
  const tmpSaooB$1 = index$1 > 0;
  $inlinedFunction: {
    heap.push(node);
    if (tmpSaooB$1) {
      const tmpBinLhs$261 = index$1 - 1;
      const tmpClusterSSA_parentIndex = tmpBinLhs$261 >>> 1;
      const tmpClusterSSA_parent = heap[tmpClusterSSA_parentIndex];
      const tmpBinLhs$263 = compare(tmpClusterSSA_parent, node);
      const tmpIfTest$369 = tmpBinLhs$263 > 0;
      if (tmpIfTest$369) {
        heap[tmpClusterSSA_parentIndex] = node;
        heap[index$1] = tmpClusterSSA_parent;
        let tmpClusterSSA_index$3 = tmpClusterSSA_parentIndex;
        let tmpClusterSSA_tmpIfTest$367 = tmpClusterSSA_parentIndex > 0;
        while ($LOOP_UNROLL_100) {
          if (tmpClusterSSA_tmpIfTest$367) {
            const tmpBinLhs$1 = tmpClusterSSA_index$3 - 1;
            const tmpClusterSSA_parentIndex$1 = tmpBinLhs$1 >>> 1;
            const tmpClusterSSA_parent$1 = heap[tmpClusterSSA_parentIndex$1];
            const tmpBinLhs$3 = compare(tmpClusterSSA_parent$1, node);
            const tmpIfTest$2 = tmpBinLhs$3 > 0;
            if (tmpIfTest$2) {
              heap[tmpClusterSSA_parentIndex$1] = node;
              heap[tmpClusterSSA_index$3] = tmpClusterSSA_parent$1;
              tmpClusterSSA_index$3 = tmpClusterSSA_parentIndex$1;
              tmpClusterSSA_tmpIfTest$367 = tmpClusterSSA_parentIndex$1 > 0;
            } else {
              break $inlinedFunction;
            }
          } else {
            break;
          }
        }
      } else {
      }
    } else {
    }
  }
  return undefined;
};
$(push);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = c;
  const d = e;
  debugger;
  const f = b.length;
  const g = f > 0;
  $inlinedFunction: {
    b.push( d );
    if (g) {
      const h = f - 1;
      const i = h >>> 1;
      const j = b[ i ];
      const k = compare( j, d );
      const l = k > 0;
      if (l) {
        b[i] = d;
        b[f] = j;
        let m = i;
        let n = i > 0;
        while ($LOOP_UNROLL_100) {
          if (n) {
            const o = m - 1;
            const p = o >>> 1;
            const q = b[ p ];
            const r = compare( q, d );
            const s = r > 0;
            if (s) {
              b[p] = d;
              b[m] = q;
              m = p;
              n = p > 0;
            }
            else {
              break $inlinedFunction;
            }
          }
          else {
            break;
          }
        }
      }
    }
  }
  return undefined;
};
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

compare

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
