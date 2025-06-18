# Preval test case

# if_outlining3.md

> Static arg ops > If > If outlining3
>
> Calling it with true and false
> This should cause both split functions to be kept
> Need to confirm the var names are unique
> (If and Else have the same body)
> 
> Point is: same vars should have unique names in both funcs

## Input

`````js filename=intro
const push = function(heap, node$1) {
  const index$1 = heap.length;
  const tmpSaooB$1 = index$1 > 0;
  heap.push(node$1);
  siftUp(heap, node$1, index$1, true);
  siftUp(heap, node$1, index$1, true);
  siftUp(heap, node$1, index$1, false);
  siftUp(heap, node$1, index$1, false);
  return undefined;
};
const siftUp = function(heap, node, i, cond) {
  if (cond) {
    const index = i - 1;
    const parentIndex = index >>> 1;
    const parent = heap[parentIndex];
    const lhs = $(parent, node);
    const test = lhs > 0;
    if (test) {
      heap[parentIndex] = node;
      heap[i] = parent;
      let index2 = parentIndex;
      let test2 = parentIndex > 0;
      while ($LOOP_UNROLL_100) {
        if (test2) {
          $(123);
        } else {
          break;
        }
      }
      return undefined;
    } else {
      return undefined;    
    }
  } else {
    heap[i] = node;
    let index = i;
    let parentIndex = index > 0;
    while ($LOOP_UNROLL_100) {
      if (parentIndex) {
        $(123);
      } else {
        break;
      }
    }
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
  index$1 ** 0;
  const tmpMCF /*:unknown*/ = heap.push;
  $dotCall(tmpMCF, heap, `push`, node$1);
  const tmpSaooB$2 /*:number*/ = index$1 - 1;
  const tmpSaooB$4 /*:number*/ = tmpSaooB$2 >>> 1;
  siftUp_t(heap, node$1, index$1, tmpSaooB$4);
  const tmpSaooB /*:number*/ = index$1 - 1;
  const tmpSaooB$5 /*:number*/ = tmpSaooB >>> 1;
  siftUp_t(heap, node$1, index$1, tmpSaooB$5);
  siftUp_f(heap, node$1, index$1);
  siftUp_f(heap, node$1, index$1);
  return undefined;
};
const siftUp_t /*:(unknown, unknown, unknown, number)=>undefined*/ = function ($$0, $$1, $$2, $$3) {
  const heap$1 /*:unknown*/ = $$0;
  const node /*:unknown*/ = $$1;
  const i /*:unknown*/ = $$2;
  const parentIndex /*:number*/ = $$3;
  debugger;
  const parent /*:unknown*/ = heap$1[parentIndex];
  const lhs /*:unknown*/ = $(parent, node);
  const test /*:boolean*/ = lhs > 0;
  if (test) {
    heap$1[parentIndex] = node;
    heap$1[i] = parent;
    while ($LOOP_UNROLL_100) {
      const test2 /*:boolean*/ = parentIndex > 0;
      if (test2) {
        $(123);
      } else {
        break;
      }
    }
    return undefined;
  } else {
    return undefined;
  }
};
const siftUp_f /*:(unknown, unknown, unknown)=>undefined*/ = function ($$0, $$1, $$2) {
  const heap$2 /*:unknown*/ = $$0;
  const node$2 /*:unknown*/ = $$1;
  const i$1 /*:unknown*/ = $$2;
  debugger;
  heap$2[i$1] = node$2;
  const parentIndex$1 /*:boolean*/ = i$1 > 0;
  if (parentIndex$1) {
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      $(123);
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
  index$1 ** 0;
  heap.push(node$1);
  siftUp_t(heap, node$1, index$1, (index$1 - 1) >>> 1);
  siftUp_t(heap, node$1, index$1, (index$1 - 1) >>> 1);
  siftUp_f(heap, node$1, index$1);
  siftUp_f(heap, node$1, index$1);
};
const siftUp_t = function (heap$1, node, i, parentIndex) {
  const parent = heap$1[parentIndex];
  if ($(parent, node) > 0) {
    heap$1[parentIndex] = node;
    heap$1[i] = parent;
    while (true) {
      if (parentIndex > 0) {
        $(123);
      } else {
        break;
      }
    }
  }
};
const siftUp_f = function (heap$2, node$2, i$1) {
  heap$2[i$1] = node$2;
  if (i$1 > 0) {
    while (true) {
      $(123);
    }
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
  d ** 0;
  const e = b.push;
  $dotCall( e, b, "push", c );
  const f = d - 1;
  const g = f >>> 1;
  h( b, c, d, g );
  const i = d - 1;
  const j = i >>> 1;
  h( b, c, d, j );
  k( b, c, d );
  k( b, c, d );
  return undefined;
};
const h = function($$0,$$1,$$2,$$3 ) {
  const l = $$0;
  const m = $$1;
  const n = $$2;
  const o = $$3;
  debugger;
  const p = l[ o ];
  const q = $( p, m );
  const r = q > 0;
  if (r) {
    l[o] = m;
    l[n] = p;
    while ($LOOP_UNROLL_100) {
      const s = o > 0;
      if (s) {
        $( 123 );
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
const k = function($$0,$$1,$$2 ) {
  const t = $$0;
  const u = $$1;
  const v = $$2;
  debugger;
  t[v] = u;
  const w = v > 0;
  if (w) {
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      $( 123 );
    }
    return undefined;
  }
  else {
    return undefined;
  }
};
$( a );
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
  siftUp(heap, node$1, index$1, true);
  siftUp(heap, node$1, index$1, true);
  siftUp(heap, node$1, index$1, false);
  siftUp(heap, node$1, index$1, false);
  return undefined;
};
const siftUp = function ($$0, $$1, $$2, $$3) {
  let heap$1 = $$0;
  let node = $$1;
  let i = $$2;
  let cond = $$3;
  debugger;
  if (cond) {
    const index = i - 1;
    const parentIndex = index >>> 1;
    const parent = heap$1[parentIndex];
    const lhs = $(parent, node);
    const test = lhs > 0;
    if (test) {
      heap$1[parentIndex] = node;
      heap$1[i] = parent;
      let index2 = parentIndex;
      let test2 = parentIndex > 0;
      while ($LOOP_UNROLL_100) {
        if (test2) {
          $(123);
        } else {
          break;
        }
      }
      return undefined;
    } else {
      return undefined;
    }
  } else {
    heap$1[i] = node;
    let index$2 = i;
    let parentIndex$1 = index$2 > 0;
    while ($LOOP_UNROLL_100) {
      if (parentIndex$1) {
        $(123);
      } else {
        break;
      }
    }
    return undefined;
  }
};
$(push);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
