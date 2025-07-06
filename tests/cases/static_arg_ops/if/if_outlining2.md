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
      while ($LOOP_UNROLLS_LEFT_100) {
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
const tmpFree /*:(number)=>number*/ = function $free($$0) {
  const tmpClusterSSA_index$3 /*:number*/ = $$0;
  debugger;
  const tmpBinLhs$1 /*:number*/ = tmpClusterSSA_index$3 - 1;
  const tmpRet /*:number*/ = tmpBinLhs$1 >>> 1;
  return tmpRet;
};
const push /*:(unknown, unknown)=>undefined*/ = function ($$0, $$1) {
  const heap /*:unknown*/ = $$0;
  const node$1 /*:unknown*/ = $$1;
  debugger;
  const index$1 /*:unknown*/ = heap.length;
  const tmpSaooB$1 /*:boolean*/ = index$1 > 0;
  const tmpMCF /*:unknown*/ = heap.push;
  $dotCall(tmpMCF, heap, `push`, node$1);
  if (tmpSaooB$1) {
    const tmpSaooB /*:number*/ = index$1 - 1;
    const tmpFrfrOutline /*:number*/ = tmpSaooB >>> 1;
    siftUp_t(heap, node$1, index$1, tmpFrfrOutline);
    const tmpSaooB$2 /*:number*/ = index$1 - 1;
    const tmpFrfrOutline$1 /*:number*/ = tmpSaooB$2 >>> 1;
    siftUp_t(heap, node$1, index$1, tmpFrfrOutline$1);
    const tmpSaooB$4 /*:number*/ = index$1 - 1;
    const tmpFrfrOutline$3 /*:number*/ = tmpSaooB$4 >>> 1;
    siftUp_t(heap, node$1, index$1, tmpFrfrOutline$3);
    const tmpSaooB$6 /*:number*/ = index$1 - 1;
    const tmpFrfrOutline$5 /*:number*/ = tmpSaooB$6 >>> 1;
    siftUp_t(heap, node$1, index$1, tmpFrfrOutline$5);
    return undefined;
  } else {
    return undefined;
  }
};
const siftUp_t /*:(unknown, unknown, unknown, number)=>undefined*/ = function ($$0, $$1, $$2, $$3) {
  const heap$5 /*:unknown*/ = $$0;
  const node$3 /*:unknown*/ = $$1;
  const i$13 /*:unknown*/ = $$2;
  const tmpClusterSSA_parentIndex /*:number*/ = $$3;
  debugger;
  const tmpClusterSSA_parent /*:unknown*/ = heap$5[tmpClusterSSA_parentIndex];
  const tmpBinLhs$263 /*:unknown*/ = compare(tmpClusterSSA_parent, node$3);
  const tmpIfTest$369 /*:boolean*/ = tmpBinLhs$263 > 0;
  if (tmpIfTest$369) {
    heap$5[tmpClusterSSA_parentIndex] = node$3;
    heap$5[i$13] = tmpClusterSSA_parent;
    let tmpClusterSSA_index$1 /*:number*/ = tmpClusterSSA_parentIndex;
    let tmpClusterSSA_tmpIfTest$367 /*:boolean*/ = tmpClusterSSA_parentIndex > 0;
    while ($LOOP_UNROLLS_LEFT_100) {
      if (tmpClusterSSA_tmpIfTest$367) {
        const tmpClusterSSA_parentIndex$1 /*:number*/ = $frfr(tmpFree, tmpClusterSSA_index$1);
        const tmpClusterSSA_parent$1 /*:unknown*/ = heap$5[tmpClusterSSA_parentIndex$1];
        const tmpBinLhs$3 /*:unknown*/ = compare(tmpClusterSSA_parent$1, node$3);
        const tmpIfTest$2 /*:boolean*/ = tmpBinLhs$3 > 0;
        if (tmpIfTest$2) {
          heap$5[tmpClusterSSA_parentIndex$1] = node$3;
          heap$5[tmpClusterSSA_index$1] = tmpClusterSSA_parent$1;
          tmpClusterSSA_index$1 = tmpClusterSSA_parentIndex$1;
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
const tmpFree = function $free(tmpClusterSSA_index$3) {
  const tmpRet = (tmpClusterSSA_index$3 - 1) >>> 1;
  return tmpRet;
};
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
const siftUp_t = function (heap$5, node$3, i$13, tmpClusterSSA_parentIndex) {
  const tmpClusterSSA_parent = heap$5[tmpClusterSSA_parentIndex];
  if (compare(tmpClusterSSA_parent, node$3) > 0) {
    heap$5[tmpClusterSSA_parentIndex] = node$3;
    heap$5[i$13] = tmpClusterSSA_parent;
    let tmpClusterSSA_index$1 = tmpClusterSSA_parentIndex;
    let tmpClusterSSA_tmpIfTest$367 = tmpClusterSSA_parentIndex > 0;
    while (true) {
      if (tmpClusterSSA_tmpIfTest$367) {
        const tmpClusterSSA_parentIndex$1 = tmpFree(tmpClusterSSA_index$1);
        const tmpClusterSSA_parent$1 = heap$5[tmpClusterSSA_parentIndex$1];
        if (compare(tmpClusterSSA_parent$1, node$3) > 0) {
          heap$5[tmpClusterSSA_parentIndex$1] = node$3;
          heap$5[tmpClusterSSA_index$1] = tmpClusterSSA_parent$1;
          tmpClusterSSA_index$1 = tmpClusterSSA_parentIndex$1;
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


## PST Settled
With rename=true

`````js filename=intro
const a = function $free($$0 ) {
  const b = $$0;
  debugger;
  const c = b - 1;
  const d = c >>> 1;
  return d;
};
const e = function($$0,$$1 ) {
  const f = $$0;
  const g = $$1;
  debugger;
  const h = f.length;
  const i = h > 0;
  const j = f.push;
  $dotCall( j, f, "push", g );
  if (i) {
    const k = h - 1;
    const l = k >>> 1;
    m( f, g, h, l );
    const n = h - 1;
    const o = n >>> 1;
    m( f, g, h, o );
    const p = h - 1;
    const q = p >>> 1;
    m( f, g, h, q );
    const r = h - 1;
    const s = r >>> 1;
    m( f, g, h, s );
    return undefined;
  }
  else {
    return undefined;
  }
};
const m = function($$0,$$1,$$2,$$3 ) {
  const t = $$0;
  const u = $$1;
  const v = $$2;
  const w = $$3;
  debugger;
  const x = t[ w ];
  const y = compare( x, u );
  const z = y > 0;
  if (z) {
    t[w] = u;
    t[v] = x;
    let ba = w;
    let bb = w > 0;
    while ($LOOP_UNROLLS_LEFT_100) {
      if (bb) {
        const bc = bd( a, ba );
        const be = t[ bc ];
        const bf = compare( be, u );
        const bg = bf > 0;
        if (bg) {
          t[bc] = u;
          t[ba] = be;
          ba = bc;
          bb = bc > 0;
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
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const push = function ($$0, $$1) {
  let heap = $$0;
  let node$1 = $$1;
  debugger;
  const index$1 = heap.length;
  const tmpSaooB$1 = index$1 > 0;
  const tmpMCF = heap.push;
  $dotCall(tmpMCF, heap, `push`, node$1);
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
      while ($LOOP_UNROLLS_LEFT_100) {
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


## Todos triggered


None


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
