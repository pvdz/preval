# Preval test case

# base.md

> Free > Free nested > Base
>
>

## Input

`````js filename=intro
const f = function $free(a, b) {
  const c = a + b;
  const d = c * 10;
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
  return d;
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
  const c = $$0;
  const d = $$1;
  debugger;
  const e = c * 20;
  const f = d * 40;
  const g = e + f;
  const h = g * 10;
  return h;
};
const i = $( 100 );
const j = i * 1;
const k = $( 200 );
const l = k * 1;
const m = n( a, j, l );
$( m );
`````

## Denormalized

(This ought to be the final result)


`````js filename=intro
const g = function $free(n, o) {
  const p = n * 20;
  const d = (p + o * 40) * 10;
  return d;
};
const x = $(100) * 1;
$($frfr(g, x, $(200) * 1));
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 200
 - 3: 100000
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
