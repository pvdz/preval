# Preval test case

# if_outlining2.md

> Static arg ops > If > If outlining2
>
> Calling siftup multiple times

## Input

`````js filename=intro
const push = function(heap, node$1) {
  const index$1 = heap.length;
  const tmpSaooB$1 = index$1 > 0;
  heap.push(node$1);
  siftUp(heap, node$1, index$1, tmpSaooB$1);
  siftUp(heap, node$1, index$1, tmpSaooB$1);
  siftUp(heap, node$1, index$1, tmpSaooB$1);
  siftUp(heap, node$1, index$1, tmpSaooB$1);
  return undefined;
};
const siftUp = function(heap$5, node$3, i$13, tmpOutlinedParam) {
  if (tmpOutlinedParam) {
    const tmpBinLhs$261 = i$13 - 1;
    const tmpClusterSSA_parentIndex = tmpBinLhs$261 >>> 1;
    const tmpClusterSSA_parent = heap$5[tmpClusterSSA_parentIndex];
    const tmpBinLhs$263 = compare(tmpClusterSSA_parent, node$3);
    const tmpIfTest$369 = tmpBinLhs$263 > 0;
    if (tmpIfTest$369) {
      heap$5[tmpClusterSSA_parentIndex] = node$3;
      heap$5[i$13] = tmpClusterSSA_parent;
      let tmpClusterSSA_index$3 = tmpClusterSSA_parentIndex;
      let tmpClusterSSA_tmpIfTest$367 = tmpClusterSSA_parentIndex > 0;
      while ($LOOP_UNROLL_100) {
        if (tmpClusterSSA_tmpIfTest$367) {
          const tmpBinLhs$1 = tmpClusterSSA_index$3 - 1;
          const tmpClusterSSA_parentIndex$1 = tmpBinLhs$1 >>> 1;
          const tmpClusterSSA_parent$1 = heap$5[tmpClusterSSA_parentIndex$1];
          const tmpBinLhs$3 = compare(tmpClusterSSA_parent$1, node$3);
          const tmpIfTest$2 = tmpBinLhs$3 > 0;
          if (tmpIfTest$2) {
            heap$5[tmpClusterSSA_parentIndex$1] = node$3;
            heap$5[tmpClusterSSA_index$3] = tmpClusterSSA_parent$1;
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
  let node$1 = $$1;
  debugger;
  const index$1 = heap.length;
  const tmpSaooB$1 = index$1 > 0;
  heap.push(node$1);
  siftUp(heap, node$1, index$1, tmpSaooB$1);
  siftUp(heap, node$1, index$1, tmpSaooB$1);
  siftUp(heap, node$1, index$1, tmpSaooB$1);
  siftUp(heap, node$1, index$1, tmpSaooB$1);
  return undefined;
};
const siftUp = function ($$0, $$1, $$2, $$3) {
  let heap$5 = $$0;
  let node$3 = $$1;
  let i$13 = $$2;
  let tmpOutlinedParam = $$3;
  debugger;
  if (tmpOutlinedParam) {
    const tmpBinLhs$261 = i$13 - 1;
    const tmpClusterSSA_parentIndex = tmpBinLhs$261 >>> 1;
    const tmpClusterSSA_parent = heap$5[tmpClusterSSA_parentIndex];
    const tmpBinLhs$263 = compare(tmpClusterSSA_parent, node$3);
    const tmpIfTest$369 = tmpBinLhs$263 > 0;
    if (tmpIfTest$369) {
      heap$5[tmpClusterSSA_parentIndex] = node$3;
      heap$5[i$13] = tmpClusterSSA_parent;
      let tmpClusterSSA_index$3 = tmpClusterSSA_parentIndex;
      let tmpClusterSSA_tmpIfTest$367 = tmpClusterSSA_parentIndex > 0;
      while ($LOOP_UNROLL_100) {
        if (tmpClusterSSA_tmpIfTest$367) {
          const tmpBinLhs$1 = tmpClusterSSA_index$3 - 1;
          const tmpClusterSSA_parentIndex$1 = tmpBinLhs$1 >>> 1;
          const tmpClusterSSA_parent$1 = heap$5[tmpClusterSSA_parentIndex$1];
          const tmpBinLhs$3 = compare(tmpClusterSSA_parent$1, node$3);
          const tmpIfTest$2 = tmpBinLhs$3 > 0;
          if (tmpIfTest$2) {
            heap$5[tmpClusterSSA_parentIndex$1] = node$3;
            heap$5[tmpClusterSSA_index$3] = tmpClusterSSA_parent$1;
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
  let node$1 = $$1;
  debugger;
  const index$1 = heap.length;
  const tmpSaooB$1 = index$1 > 0;
  heap.push(node$1);
  siftUp(heap, node$1, index$1, tmpSaooB$1);
  siftUp(heap, node$1, index$1, tmpSaooB$1);
  siftUp(heap, node$1, index$1, tmpSaooB$1);
  siftUp(heap, node$1, index$1, tmpSaooB$1);
  return undefined;
};
const siftUp = function ($$0, $$1, $$2, $$3) {
  let heap$5 = $$0;
  let node$3 = $$1;
  let i$13 = $$2;
  let tmpOutlinedParam = $$3;
  debugger;
  if (tmpOutlinedParam) {
    const tmpBinLhs$261 = i$13 - 1;
    const tmpClusterSSA_parentIndex = tmpBinLhs$261 >>> 1;
    const tmpClusterSSA_parent = heap$5[tmpClusterSSA_parentIndex];
    const tmpBinLhs$263 = compare(tmpClusterSSA_parent, node$3);
    const tmpIfTest$369 = tmpBinLhs$263 > 0;
    if (tmpIfTest$369) {
      heap$5[tmpClusterSSA_parentIndex] = node$3;
      heap$5[i$13] = tmpClusterSSA_parent;
      let tmpClusterSSA_index$3 = tmpClusterSSA_parentIndex;
      let tmpClusterSSA_tmpIfTest$367 = tmpClusterSSA_parentIndex > 0;
      while ($LOOP_UNROLL_100) {
        if (tmpClusterSSA_tmpIfTest$367) {
          const tmpBinLhs$1 = tmpClusterSSA_index$3 - 1;
          const tmpClusterSSA_parentIndex$1 = tmpBinLhs$1 >>> 1;
          const tmpClusterSSA_parent$1 = heap$5[tmpClusterSSA_parentIndex$1];
          const tmpBinLhs$3 = compare(tmpClusterSSA_parent$1, node$3);
          const tmpIfTest$2 = tmpBinLhs$3 > 0;
          if (tmpIfTest$2) {
            heap$5[tmpClusterSSA_parentIndex$1] = node$3;
            heap$5[tmpClusterSSA_index$3] = tmpClusterSSA_parent$1;
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
  const node$1 = $$1;
  debugger;
  const index$1 = heap.length;
  const tmpSaooB$1 = index$1 > 0;
  heap.push(node$1);
  if (tmpSaooB$1) {
    const tmpSaooB = index$1 - 1;
    const tmpSaooB$9 = tmpSaooB >>> 1;
    siftUp_t(heap, node$1, index$1, tmpSaooB$9);
    const tmpSaooB$2 = index$1 - 1;
    const tmpSaooB$7 = tmpSaooB$2 >>> 1;
    siftUp_t(heap, node$1, index$1, tmpSaooB$7);
    const tmpSaooB$4 = index$1 - 1;
    const tmpSaooB$5 = tmpSaooB$4 >>> 1;
    siftUp_t(heap, node$1, index$1, tmpSaooB$5);
    const tmpSaooB$6 = index$1 - 1;
    const tmpSaooB$3 = tmpSaooB$6 >>> 1;
    siftUp_t(heap, node$1, index$1, tmpSaooB$3);
    return undefined;
  } else {
    return undefined;
  }
};
const siftUp_t = function ($$0, $$1, $$2, $$3) {
  const heap$5 = $$0;
  const node$3 = $$1;
  const i$13 = $$2;
  const tmpOutlinedParam$1 = $$3;
  debugger;
  const tmpClusterSSA_parent = heap$5[tmpOutlinedParam$1];
  const tmpBinLhs$263 = compare(tmpClusterSSA_parent, node$3);
  const tmpIfTest$369 = tmpBinLhs$263 > 0;
  if (tmpIfTest$369) {
    heap$5[tmpOutlinedParam$1] = node$3;
    heap$5[i$13] = tmpClusterSSA_parent;
    let tmpClusterSSA_index$3 = tmpOutlinedParam$1;
    let tmpClusterSSA_tmpIfTest$367 = tmpOutlinedParam$1 > 0;
    while ($LOOP_UNROLL_100) {
      if (tmpClusterSSA_tmpIfTest$367) {
        const tmpBinLhs$1 = tmpClusterSSA_index$3 - 1;
        const tmpClusterSSA_parentIndex$1 = tmpBinLhs$1 >>> 1;
        const tmpClusterSSA_parent$1 = heap$5[tmpClusterSSA_parentIndex$1];
        const tmpBinLhs$3 = compare(tmpClusterSSA_parent$1, node$3);
        const tmpIfTest$2 = tmpBinLhs$3 > 0;
        if (tmpIfTest$2) {
          heap$5[tmpClusterSSA_parentIndex$1] = node$3;
          heap$5[tmpClusterSSA_index$3] = tmpClusterSSA_parent$1;
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
  b.push( d );
  if (g) {
    const h = f - 1;
    const i = h >>> 1;
    j( b, d, f, i );
    const k = f - 1;
    const l = k >>> 1;
    j( b, d, f, l );
    const m = f - 1;
    const n = m >>> 1;
    j( b, d, f, n );
    const o = f - 1;
    const p = o >>> 1;
    j( b, d, f, p );
    return undefined;
  }
  else {
    return undefined;
  }
};
const j = function($$0,$$1,$$2,$$3 ) {
  const q = c;
  const r = e;
  const s = t;
  const u = v;
  debugger;
  const w = q[ u ];
  const x = compare( w, r );
  const y = x > 0;
  if (y) {
    q[u] = r;
    q[s] = w;
    let z = u;
    let ba = u > 0;
    while ($LOOP_UNROLL_100) {
      if (ba) {
        const bb = z - 1;
        const bc = bb >>> 1;
        const bd = q[ bc ];
        const be = compare( bd, r );
        const bf = be > 0;
        if (bf) {
          q[bc] = r;
          q[z] = bd;
          z = bc;
          ba = bc > 0;
        }
        else {
          return undefined;
        }
      }
      else {
        break;
      }
    }
    return undefined;
  }
  else {
    return undefined;
  }
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
