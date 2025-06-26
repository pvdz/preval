# Preval test case

# accumulated_rounding_loop.md

> Math > Ai > Accumulated rounding loop
>
> Accumulated rounding error in a loop

## Input

`````js filename=intro
let x = $(0);
for (let i = 0; i < 1e2; i++) x += 0.0000001;
$(x);
// Should be close to 1, but may not be exactly 1 due to floating-point error
`````


## Settled


`````js filename=intro
const tmpFree /*:(primitive)=>primitive*/ = function $free($$0) {
  const tmpClusterSSA_x$1 /*:primitive*/ = $$0;
  debugger;
  const tmpClusterSSA_x$5 /*:primitive*/ = tmpClusterSSA_x$1 + 1e-7;
  const tmpRet /*:primitive*/ = tmpClusterSSA_x$5 + 1e-7;
  const tmpRet$1 /*:primitive*/ = tmpRet + 1e-7;
  const tmpRet$2 /*:primitive*/ = tmpRet$1 + 1e-7;
  const tmpRet$3 /*:primitive*/ = tmpRet$2 + 1e-7;
  const tmpRet$4 /*:primitive*/ = tmpRet$3 + 1e-7;
  const tmpRet$5 /*:primitive*/ = tmpRet$4 + 1e-7;
  const tmpRet$6 /*:primitive*/ = tmpRet$5 + 1e-7;
  const tmpRet$7 /*:primitive*/ = tmpRet$6 + 1e-7;
  const tmpRet$8 /*:primitive*/ = tmpRet$7 + 1e-7;
  return tmpRet$8;
};
const x /*:unknown*/ = $(0);
const tmpClusterSSA_x /*:primitive*/ = x + 1e-7;
let tmpClusterSSA_x$2 /*:primitive*/ = $frfr(tmpFree, tmpClusterSSA_x);
let tmpClusterSSA_i$2 /*:number*/ = 11;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_i$2 < 100;
  if (tmpIfTest$1) {
    tmpClusterSSA_x$2 = tmpClusterSSA_x$2 + 1e-7;
    tmpClusterSSA_i$2 = tmpClusterSSA_i$2 + 1;
  } else {
    break;
  }
}
$(tmpClusterSSA_x$2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpClusterSSA_x$2 = $frfr(function $free(tmpClusterSSA_x$1) {
  const tmpRet$8 = tmpClusterSSA_x$1 + 1e-7 + 1e-7 + 1e-7 + 1e-7 + 1e-7 + 1e-7 + 1e-7 + 1e-7 + 1e-7 + 1e-7;
  return tmpRet$8;
}, $(0) + 1e-7);
let tmpClusterSSA_i$2 = 11;
while (true) {
  if (tmpClusterSSA_i$2 < 100) {
    tmpClusterSSA_x$2 = tmpClusterSSA_x$2 + 1e-7;
    tmpClusterSSA_i$2 = tmpClusterSSA_i$2 + 1;
  } else {
    break;
  }
}
$(tmpClusterSSA_x$2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = c + 1e-7;
  const e = d + 1e-7;
  const f = e + 1e-7;
  const g = f + 1e-7;
  const h = g + 1e-7;
  const i = h + 1e-7;
  const j = i + 1e-7;
  const k = j + 1e-7;
  const l = k + 1e-7;
  const m = l + 1e-7;
  return m;
};
const n = $( 0 );
const o = n + 1e-7;
let p = q( a, o );
let r = 11;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const s = r < 100;
  if (s) {
    p = p + 1e-7;
    r = r + 1;
  }
  else {
    break;
  }
}
$( p );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(0);
let i = 0;
while (true) {
  const tmpIfTest = i < 100;
  if (tmpIfTest) {
    x = x + 1e-7;
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
  } else {
    break;
  }
}
$(x);
`````


## Todos triggered


- (todo) - at least one of the call args to


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0.000010000000000000011
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
