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


## Settled


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
const tmpBinLhs /*:unknown*/ = $(100);
const x /*:number*/ = tmpBinLhs * 1;
const tmpBinLhs$1 /*:unknown*/ = $(200);
const y /*:number*/ = tmpBinLhs$1 * 1;
const tmp /*:number*/ = $frfr(g, x, y);
$(tmp);
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
$(g(x, $(200) * 1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $free($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  const d = b * 20;
  const e = c * 40;
  const f = d + e;
  const g = f * 10;
  return g;
};
const h = $( 100 );
const i = h * 1;
const j = $( 200 );
const k = j * 1;
const l = m( a, i, k );
$( l );
`````


## Normalized
(This is what phase1 received the first time)

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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 200
 - 3: 100000
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
