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
  if (tmpSaooB$1) {
    const tmpSaooB = index$1 - 1;
    const tmpSaooB$2 = tmpSaooB >>> 1;
    siftUp_t($dlr_$$0, $dlr_$$1, index$1, tmpSaooB$2);
    return undefined;
  } else {
    return undefined;
  }
};
const siftUp_t = function ($$0, $$1, $$2, $$3) {
  const $dlr_$$2 = $$0;
  const $dlr_$$4 = $$1;
  const $dlr_$$6 = $$2;
  const tmpOutlinedParam$1 = $$3;
  debugger;
  const tmpClusterSSA_parent = $dlr_$$2[tmpOutlinedParam$1];
  const tmpBinLhs$263 = compare(tmpClusterSSA_parent, $dlr_$$4);
  const tmpIfTest$369 = tmpBinLhs$263 > 0;
  if (tmpIfTest$369) {
    $dlr_$$2[tmpOutlinedParam$1] = $dlr_$$4;
    $dlr_$$2[$dlr_$$6] = tmpClusterSSA_parent;
    let tmpClusterSSA_index$3 = tmpOutlinedParam$1;
    let tmpClusterSSA_tmpIfTest$367 = tmpOutlinedParam$1 > 0;
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
    return undefined;
  }
  else {
    return undefined;
  }
};
const j = function($$0,$$1,$$2,$$3 ) {
  const k = c;
  const l = e;
  const m = n;
  const o = p;
  debugger;
  const q = k[ o ];
  const r = compare( q, l );
  const s = r > 0;
  if (s) {
    k[o] = l;
    k[m] = q;
    let t = o;
    let u = o > 0;
    while ($LOOP_UNROLL_100) {
      if (u) {
        const v = t - 1;
        const w = v >>> 1;
        const x = k[ w ];
        const y = compare( x, l );
        const z = y > 0;
        if (z) {
          k[w] = l;
          k[t] = x;
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
