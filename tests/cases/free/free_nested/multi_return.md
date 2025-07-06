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
  const tmpIfTest /*:boolean*/ = d > 40;
  if (tmpIfTest) {
    const tmpClusterSSA_r /*:number*/ = d * 10;
    return tmpClusterSSA_r;
  } else {
    return d;
  }
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
  if (d > 40) {
    const tmpClusterSSA_r = d * 10;
    return tmpClusterSSA_r;
  } else {
    return d;
  }
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
  const h = g > 40;
  if (h) {
    const i = g * 10;
    return i;
  }
  else {
    return g;
  }
};
const j = $( 100 );
const k = j * 1;
const l = $( 200 );
const m = l * 1;
const n = o( a, k, m );
$( n );
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


## Todos triggered


- (todo) fixme: spyless vars and labeled nodes


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 200
 - 3: 1000000
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
