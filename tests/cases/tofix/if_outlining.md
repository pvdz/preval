# Preval test case

# if_outlining.md

> Tofix > If outlining
>
> From react 18

The outer `if` in the siftUp function is driven by an unknown boolean 
from the push function. While tricky, it is possible to outline the
whole `if`. Have to be careful about bindings and scopes here.

As an aside, shouldn't we just inline single-use functions entirely?

## Input

`````js filename=intro
const push = function($$0, $$1) {
  const heap = $$0;
  const node$1 = $$1;
  debugger;
  const index$1 = heap.length;
  const tmpSaooB$1 = index$1 > 0;
  heap.push(node$1);
  siftUp(heap, node$1, index$1, tmpSaooB$1);
  return undefined;
};
const siftUp = function($$0, $$1, $$2, $$3) {
  const heap$5 = $$0;
  const node$3 = $$1;
  const i$13 = $$2;
  const tmpOutlinedParam = $$3;
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

## Pre Normal


`````js filename=intro
const push = function ($$0, $$1) {
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  debugger;
  const heap = $dlr_$$0;
  const node$1 = $dlr_$$1;
  const index$1 = heap.length;
  const tmpSaooB$1 = index$1 > 0;
  heap.push(node$1);
  siftUp(heap, node$1, index$1, tmpSaooB$1);
  return undefined;
};
const siftUp = function ($$0, $$1, $$2, $$3) {
  let $dlr_$$2 = $$0;
  let $dlr_$$4 = $$1;
  let $dlr_$$6 = $$2;
  let $dlr_$$3 = $$3;
  debugger;
  const heap$5 = $dlr_$$2;
  const node$3 = $dlr_$$4;
  const i$13 = $dlr_$$6;
  const tmpOutlinedParam = $dlr_$$3;
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
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  debugger;
  const heap = $dlr_$$0;
  const node$1 = $dlr_$$1;
  const index$1 = heap.length;
  const tmpSaooB$1 = index$1 > 0;
  heap.push(node$1);
  siftUp(heap, node$1, index$1, tmpSaooB$1);
  return undefined;
};
const siftUp = function ($$0, $$1, $$2, $$3) {
  let $dlr_$$2 = $$0;
  let $dlr_$$4 = $$1;
  let $dlr_$$6 = $$2;
  let $dlr_$$3 = $$3;
  debugger;
  const heap$5 = $dlr_$$2;
  const node$3 = $dlr_$$4;
  const i$13 = $dlr_$$6;
  const tmpOutlinedParam = $dlr_$$3;
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
  const $dlr_$$0 = $$0;
  const $dlr_$$1 = $$1;
  debugger;
  const index$1 = $dlr_$$0.length;
  const tmpSaooB$1 = index$1 > 0;
  $dlr_$$0.push($dlr_$$1);
  siftUp($dlr_$$0, $dlr_$$1, index$1, tmpSaooB$1);
  return undefined;
};
const siftUp = function ($$0, $$1, $$2, $$3) {
  const $dlr_$$2 = $$0;
  const $dlr_$$4 = $$1;
  const $dlr_$$6 = $$2;
  const $dlr_$$3 = $$3;
  debugger;
  if ($dlr_$$3) {
    const tmpBinLhs$261 = $dlr_$$6 - 1;
    const tmpClusterSSA_parentIndex = tmpBinLhs$261 >>> 1;
    const tmpClusterSSA_parent = $dlr_$$2[tmpClusterSSA_parentIndex];
    const tmpBinLhs$263 = compare(tmpClusterSSA_parent, $dlr_$$4);
    const tmpIfTest$369 = tmpBinLhs$263 > 0;
    if (tmpIfTest$369) {
      $dlr_$$2[tmpClusterSSA_parentIndex] = $dlr_$$4;
      $dlr_$$2[$dlr_$$6] = tmpClusterSSA_parent;
      let tmpClusterSSA_index$3 = tmpClusterSSA_parentIndex;
      let tmpClusterSSA_tmpIfTest$367 = tmpClusterSSA_parentIndex > 0;
      while ($LOOP_UNROLL_100) {
        if (tmpClusterSSA_tmpIfTest$367) {
          const tmpBinLhs$1 = tmpClusterSSA_index$3 - 1;
          const tmpClusterSSA_parentIndex$1 = tmpBinLhs$1 >>> 1;
          const tmpClusterSSA_parent$1 = $dlr_$$2[tmpClusterSSA_parentIndex$1];
          const tmpBinLhs$3 = compare(tmpClusterSSA_parent$1, $dlr_$$4);
          const tmpIfTest$2 = tmpBinLhs$3 > 0;
          if (tmpIfTest$2) {
            $dlr_$$2[tmpClusterSSA_parentIndex$1] = $dlr_$$4;
            $dlr_$$2[tmpClusterSSA_index$3] = tmpClusterSSA_parent$1;
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
  h( b, d, f, g );
  return undefined;
};
const h = function($$0,$$1,$$2,$$3 ) {
  const i = c;
  const j = e;
  const k = l;
  const m = n;
  debugger;
  if (m) {
    const o = k - 1;
    const p = o >>> 1;
    const q = i[ p ];
    const r = compare( q, j );
    const s = r > 0;
    if (s) {
      i[p] = j;
      i[k] = q;
      let t = p;
      let u = p > 0;
      while ($LOOP_UNROLL_100) {
        if (u) {
          const v = t - 1;
          const w = v >>> 1;
          const x = i[ w ];
          const y = compare( x, j );
          const z = y > 0;
          if (z) {
            i[w] = j;
            i[t] = x;
            t = w;
            u = w > 0;
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
