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


## Settled


`````js filename=intro
const push /*:(unknown, unknown)=>undefined*/ = function ($$0, $$1) {
  const heap /*:unknown*/ = $$0;
  const node /*:unknown*/ = $$1;
  debugger;
  $inlinedFunction: {
    const index$1 /*:unknown*/ = heap.length;
    const tmpSaooB$1 /*:boolean*/ = index$1 > 0;
    const tmpMCF /*:unknown*/ = heap.push;
    $dotCall(tmpMCF, heap, `push`, node);
    if (tmpSaooB$1) {
      const tmpBinLhs$261 /*:number*/ = index$1 - 1;
      const tmpClusterSSA_parentIndex /*:number*/ = tmpBinLhs$261 >>> 1;
      const tmpClusterSSA_parent /*:unknown*/ = heap[tmpClusterSSA_parentIndex];
      const tmpBinLhs$263 /*:unknown*/ = compare(tmpClusterSSA_parent, node);
      const tmpIfTest$369 /*:boolean*/ = tmpBinLhs$263 > 0;
      if (tmpIfTest$369) {
        heap[tmpClusterSSA_parentIndex] = node;
        heap[index$1] = tmpClusterSSA_parent;
        let tmpClusterSSA_index$3 /*:unknown*/ = tmpClusterSSA_parentIndex;
        let tmpClusterSSA_tmpIfTest$367 /*:boolean*/ = tmpClusterSSA_parentIndex > 0;
        while ($LOOP_UNROLL_100) {
          if (tmpClusterSSA_tmpIfTest$367) {
            const tmpBinLhs$1 /*:number*/ = tmpClusterSSA_index$3 - 1;
            const tmpClusterSSA_parentIndex$1 /*:number*/ = tmpBinLhs$1 >>> 1;
            const tmpClusterSSA_parent$1 /*:unknown*/ = heap[tmpClusterSSA_parentIndex$1];
            const tmpBinLhs$3 /*:unknown*/ = compare(tmpClusterSSA_parent$1, node);
            const tmpIfTest$2 /*:boolean*/ = tmpBinLhs$3 > 0;
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


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function (heap, node) {
  $inlinedFunction: {
    const index$1 = heap.length;
    const tmpSaooB$1 = index$1 > 0;
    heap.push(node);
    if (tmpSaooB$1) {
      const tmpClusterSSA_parentIndex = (index$1 - 1) >>> 1;
      const tmpClusterSSA_parent = heap[tmpClusterSSA_parentIndex];
      if (compare(tmpClusterSSA_parent, node) > 0) {
        heap[tmpClusterSSA_parentIndex] = node;
        heap[index$1] = tmpClusterSSA_parent;
        let tmpClusterSSA_index$3 = tmpClusterSSA_parentIndex;
        let tmpClusterSSA_tmpIfTest$367 = tmpClusterSSA_parentIndex > 0;
        while (true) {
          if (tmpClusterSSA_tmpIfTest$367) {
            const tmpClusterSSA_parentIndex$1 = (tmpClusterSSA_index$3 - 1) >>> 1;
            const tmpClusterSSA_parent$1 = heap[tmpClusterSSA_parentIndex$1];
            if (compare(tmpClusterSSA_parent$1, node) > 0) {
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
      }
    }
  }
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  $inlinedFunction: {
    const d = b.length;
    const e = d > 0;
    const f = b.push;
    $dotCall( f, b, "push", c );
    if (e) {
      const g = d - 1;
      const h = g >>> 1;
      const i = b[ h ];
      const j = compare( i, c );
      const k = j > 0;
      if (k) {
        b[h] = c;
        b[d] = i;
        let l = h;
        let m = h > 0;
        while ($LOOP_UNROLL_100) {
          if (m) {
            const n = l - 1;
            const o = n >>> 1;
            const p = b[ o ];
            const q = compare( p, c );
            const r = q > 0;
            if (r) {
              b[o] = c;
              b[l] = p;
              l = o;
              m = o > 0;
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
