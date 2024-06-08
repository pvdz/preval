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

## Pre Normal


`````js filename=intro
const push = function ($$0, $$1) {
  let heap = $$0;
  let node$1 = $$1;
  debugger;
  const index$1 = heap.length;
  const tmpSaooB$1 = index$1 > 0;
  heap.push(node$1);
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

## Normalized


`````js filename=intro
const push = function ($$0, $$1) {
  let heap = $$0;
  let node$1 = $$1;
  debugger;
  const index$1 = heap.length;
  const tmpSaooB$1 = index$1 > 0;
  heap.push(node$1);
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

## Output


`````js filename=intro
const push = function ($$0, $$1) {
  const heap = $$0;
  const node$1 = $$1;
  debugger;
  const index$1 = heap.length;
  index$1 ** 0;
  heap.push(node$1);
  const tmpSaooB$1 = index$1 - 1;
  const tmpSaooB$4 = tmpSaooB$1 >>> 1;
  siftUp_t(heap, node$1, index$1, tmpSaooB$4);
  const tmpSaooB = index$1 - 1;
  const tmpSaooB$2 = tmpSaooB >>> 1;
  siftUp_t(heap, node$1, index$1, tmpSaooB$2);
  siftUp_f(heap, node$1, index$1);
  siftUp_f(heap, node$1, index$1);
  return undefined;
};
const siftUp_t = function ($$0, $$1, $$2, $$3) {
  const heap$1 = $$0;
  const node = $$1;
  const i = $$2;
  const tmpOutlinedParam$1 = $$3;
  debugger;
  const parent = heap$1[tmpOutlinedParam$1];
  const lhs = $(parent, node);
  const test = lhs > 0;
  if (test) {
    heap$1[tmpOutlinedParam$1] = node;
    heap$1[i] = parent;
    while ($LOOP_UNROLL_100) {
      const test2 = tmpOutlinedParam$1 > 0;
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
const siftUp_f = function ($$0, $$1, $$2) {
  const heap$2 = $$0;
  const node$2 = $$1;
  const i$1 = $$2;
  debugger;
  heap$2[i$1] = node$2;
  const parentIndex$1 = i$1 > 0;
  if (parentIndex$1) {
    $(123);
    while ($LOOP_UNROLL_99) {
      $(123);
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
  f ** 0;
  b.push( d );
  const g = f - 1;
  const h = g >>> 1;
  i( b, d, f, h );
  const j = f - 1;
  const k = j >>> 1;
  i( b, d, f, k );
  l( b, d, f );
  l( b, d, f );
  return undefined;
};
const i = function($$0,$$1,$$2,$$3 ) {
  const m = c;
  const n = e;
  const o = p;
  const q = r;
  debugger;
  const s = m[ q ];
  const t = $( s, n );
  const u = t > 0;
  if (u) {
    m[q] = n;
    m[o] = s;
    while ($LOOP_UNROLL_100) {
      const v = q > 0;
      if (v) {
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
const l = function($$0,$$1,$$2 ) {
  const w = c;
  const x = e;
  const y = p;
  debugger;
  w[y] = x;
  const z = y > 0;
  if (z) {
    $( 123 );
    while ($LOOP_UNROLL_99) {
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

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
