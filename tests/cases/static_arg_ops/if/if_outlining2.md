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

## Settled


`````js filename=intro
const push /*:(unknown, unknown)=>undefined*/ = function ($$0, $$1) {
  const heap /*:unknown*/ = $$0;
  const node$1 /*:unknown*/ = $$1;
  debugger;
  const index$1 /*:unknown*/ = heap.length;
  const tmpSaooB$1 /*:boolean*/ = index$1 > 0;
  heap.push(node$1);
  if (tmpSaooB$1) {
    const tmpSaooB /*:number*/ = index$1 - 1;
    const tmpSaooB$9 /*:number*/ = tmpSaooB >>> 1;
    siftUp_t(heap, node$1, index$1, tmpSaooB$9);
    const tmpSaooB$2 /*:number*/ = index$1 - 1;
    const tmpSaooB$7 /*:number*/ = tmpSaooB$2 >>> 1;
    siftUp_t(heap, node$1, index$1, tmpSaooB$7);
    const tmpSaooB$4 /*:number*/ = index$1 - 1;
    const tmpSaooB$5 /*:number*/ = tmpSaooB$4 >>> 1;
    siftUp_t(heap, node$1, index$1, tmpSaooB$5);
    const tmpSaooB$6 /*:number*/ = index$1 - 1;
    const tmpSaooB$3 /*:number*/ = tmpSaooB$6 >>> 1;
    siftUp_t(heap, node$1, index$1, tmpSaooB$3);
    return undefined;
  } else {
    return undefined;
  }
};
const siftUp_t /*:(unknown, unknown, unknown, number)=>undefined*/ = function ($$0, $$1, $$2, $$3) {
  const heap$5 /*:unknown*/ = $$0;
  const node$3 /*:unknown*/ = $$1;
  const i$13 /*:unknown*/ = $$2;
  const tmpOutlinedParam$1 /*:number*/ = $$3;
  debugger;
  const tmpClusterSSA_parent /*:unknown*/ = heap$5[tmpOutlinedParam$1];
  const tmpBinLhs$263 /*:unknown*/ = compare(tmpClusterSSA_parent, node$3);
  const tmpIfTest$369 /*:boolean*/ = tmpBinLhs$263 > 0;
  if (tmpIfTest$369) {
    heap$5[tmpOutlinedParam$1] = node$3;
    heap$5[i$13] = tmpClusterSSA_parent;
    let tmpClusterSSA_index$3 /*:unknown*/ = tmpOutlinedParam$1;
    let tmpClusterSSA_tmpIfTest$367 /*:boolean*/ = tmpOutlinedParam$1 > 0;
    while ($LOOP_UNROLL_100) {
      if (tmpClusterSSA_tmpIfTest$367) {
        const tmpBinLhs$1 /*:number*/ = tmpClusterSSA_index$3 - 1;
        const tmpClusterSSA_parentIndex$1 /*:number*/ = tmpBinLhs$1 >>> 1;
        const tmpClusterSSA_parent$1 /*:unknown*/ = heap$5[tmpClusterSSA_parentIndex$1];
        const tmpBinLhs$3 /*:unknown*/ = compare(tmpClusterSSA_parent$1, node$3);
        const tmpIfTest$2 /*:boolean*/ = tmpBinLhs$3 > 0;
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

## Denormalized
(This ought to be the final result)

`````js filename=intro
const push = function (heap, node$1) {
  const index$1 = heap.length;
  const tmpSaooB$1 = index$1 > 0;
  heap.push(node$1);
  if (tmpSaooB$1) {
    siftUp_t(heap, node$1, index$1, (index$1 - 1) >>> 1);
    siftUp_t(heap, node$1, index$1, (index$1 - 1) >>> 1);
    siftUp_t(heap, node$1, index$1, (index$1 - 1) >>> 1);
    siftUp_t(heap, node$1, index$1, (index$1 - 1) >>> 1);
  }
};
const siftUp_t = function (heap$5, node$3, i$13, tmpOutlinedParam$1) {
  const tmpClusterSSA_parent = heap$5[tmpOutlinedParam$1];
  if (compare(tmpClusterSSA_parent, node$3) > 0) {
    heap$5[tmpOutlinedParam$1] = node$3;
    heap$5[i$13] = tmpClusterSSA_parent;
    let tmpClusterSSA_index$3 = tmpOutlinedParam$1;
    let tmpClusterSSA_tmpIfTest$367 = tmpOutlinedParam$1 > 0;
    while (true) {
      if (tmpClusterSSA_tmpIfTest$367) {
        const tmpClusterSSA_parentIndex$1 = (tmpClusterSSA_index$3 - 1) >>> 1;
        const tmpClusterSSA_parent$1 = heap$5[tmpClusterSSA_parentIndex$1];
        if (compare(tmpClusterSSA_parent$1, node$3) > 0) {
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

## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  const d = b.length;
  const e = d > 0;
  b.push( c );
  if (e) {
    const f = d - 1;
    const g = f >>> 1;
    h( b, c, d, g );
    const i = d - 1;
    const j = i >>> 1;
    h( b, c, d, j );
    const k = d - 1;
    const l = k >>> 1;
    h( b, c, d, l );
    const m = d - 1;
    const n = m >>> 1;
    h( b, c, d, n );
    return undefined;
  }
  else {
    return undefined;
  }
};
const h = function($$0,$$1,$$2,$$3 ) {
  const o = $$0;
  const p = $$1;
  const q = $$2;
  const r = $$3;
  debugger;
  const s = o[ r ];
  const t = compare( s, p );
  const u = t > 0;
  if (u) {
    o[r] = p;
    o[q] = s;
    let v = r;
    let w = r > 0;
    while ($LOOP_UNROLL_100) {
      if (w) {
        const x = v - 1;
        const y = x >>> 1;
        const z = o[ y ];
        const ba = compare( z, p );
        const bb = ba > 0;
        if (bb) {
          o[y] = p;
          o[v] = z;
          v = y;
          w = y > 0;
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

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
