# Preval test case

# multi_return.md

> Free > Free nested > Multi return
>
>

## Input

`````js filename=intro
const f = function $free(a, b) {
  const c = a + b;
  const d = c * 10;
  if (d > 40) {
    return d * 10;
  }
  return d;
}

const g = function $free(n, o) {
  const p = n * 20;
  const q = o * 40;
  const r = $frfr(f, p, q);
  return r;
}

const x = $(100) * 1;
const y = $(200) * 1;
const tmp = $frfr(g, x, y);
$(tmp);
`````

## Pre Normal


`````js filename=intro
const f = function $free($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const c = a + b;
  const d = c * 10;
  if (d > 40) {
    return d * 10;
  }
  return d;
};
const g = function $free($$0, $$1) {
  let n = $$0;
  let o = $$1;
  debugger;
  const p = n * 20;
  const q = o * 40;
  const r = $frfr(f, p, q);
  return r;
};
const x = $(100) * 1;
const y = $(200) * 1;
const tmp = $frfr(g, x, y);
$(tmp);
`````

## Normalized


`````js filename=intro
const f = function $free($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const c = a + b;
  const d = c * 10;
  const tmpIfTest = d > 40;
  if (tmpIfTest) {
    const tmpReturnArg = d * 10;
    return tmpReturnArg;
  } else {
    return d;
  }
};
const g = function $free($$0, $$1) {
  let n = $$0;
  let o = $$1;
  debugger;
  const p = n * 20;
  const q = o * 40;
  const r = $frfr(f, p, q);
  return r;
};
const tmpBinLhs = $(100);
const x = tmpBinLhs * 1;
const tmpBinLhs$1 = $(200);
const y = tmpBinLhs$1 * 1;
const tmp = $frfr(g, x, y);
$(tmp);
`````

## Output


`````js filename=intro
const g /*:(number, number)=>number*/ = function $free($$0, $$1) {
  const n /*:number*/ = $$0;
  const o /*:number*/ = $$1;
  debugger;
  const p /*:number*/ = n * 20;
  const q /*:number*/ = o * 40;
  const c /*:number*/ = p + q;
  const d /*:number*/ = c * 10;
  const tmpIfTest /*:boolean*/ = d > 40;
  if (tmpIfTest) {
    const tmpReturnArg /*:number*/ = d * 10;
    return tmpReturnArg;
  } else {
    return d;
  }
};
const tmpBinLhs = $(100);
const x /*:number*/ = tmpBinLhs * 1;
const tmpBinLhs$1 = $(200);
const y /*:number*/ = tmpBinLhs$1 * 1;
const tmp /*:number*/ = $frfr(g, x, y);
$(tmp);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0,$$1 ) {
  const c = d;
  const e = f;
  debugger;
  const g = c * 20;
  const h = e * 40;
  const i = g + h;
  const j = i * 10;
  const k = j > 40;
  if (k) {
    const l = j * 10;
    return l;
  }
  else {
    return j;
  }
};
const m = $( 100 );
const n = m * 1;
const o = $( 200 );
const p = o * 1;
const q = r( a, n, p );
$( q );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 200
 - 3: 1000000
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
