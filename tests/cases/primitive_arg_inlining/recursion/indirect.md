# Preval test case

# indirect.md

> Primitive arg inlining > Recursion > Indirect
>
> Recursion problems

## Input

`````js filename=intro
function f(n) {
  return g(n);
}
function g(n) {
  return h(n+1);
}
function h(n) {
  if ($(n) > 1000) return n;
  return f(n);
}
$(f(0));
`````


## Settled


`````js filename=intro
const f /*:(primitive)=>primitive*/ = function ($$0) {
  const n$3 /*:primitive*/ = $$0;
  debugger;
  const tmpCalleeParam$2 /*:primitive*/ = n$3 + 1;
  const tmpBinLhs /*:unknown*/ = $(tmpCalleeParam$2);
  const tmpIfTest /*:boolean*/ = tmpBinLhs > 1000;
  if (tmpIfTest) {
    return tmpCalleeParam$2;
  } else {
    const tmpClusterSSA_tmpReturnArg$3 /*:primitive*/ = f(tmpCalleeParam$2);
    return tmpClusterSSA_tmpReturnArg$3;
  }
};
const tmpCalleeParam$1 /*:primitive*/ = f(0);
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (n$3) {
  const tmpCalleeParam$2 = n$3 + 1;
  if ($(tmpCalleeParam$2) > 1000) {
    return tmpCalleeParam$2;
  } else {
    const tmpClusterSSA_tmpReturnArg$3 = f(tmpCalleeParam$2);
    return tmpClusterSSA_tmpReturnArg$3;
  }
};
$(f(0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = b + 1;
  const d = $( c );
  const e = d > 1000;
  if (e) {
    return c;
  }
  else {
    const f = a( c );
    return f;
  }
};
const g = a( 0 );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let n = $$0;
  debugger;
  const tmpReturnArg = g(n);
  return tmpReturnArg;
};
let g = function ($$0) {
  let n$1 = $$0;
  debugger;
  const tmpCallCallee = h;
  let tmpCalleeParam = n$1 + 1;
  const tmpReturnArg$1 = h(tmpCalleeParam);
  return tmpReturnArg$1;
};
let h = function ($$0) {
  let n$3 = $$0;
  debugger;
  const tmpBinLhs = $(n$3);
  const tmpIfTest = tmpBinLhs > 1000;
  if (tmpIfTest) {
    return n$3;
  } else {
    const tmpReturnArg$3 = f(n$3);
    return tmpReturnArg$3;
  }
};
let tmpCalleeParam$1 = f(0);
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 5
 - 6: 6
 - 7: 7
 - 8: 8
 - 9: 9
 - 10: 10
 - 11: 11
 - 12: 12
 - 13: 13
 - 14: 14
 - 15: 15
 - 16: 16
 - 17: 17
 - 18: 18
 - 19: 19
 - 20: 20
 - 21: 21
 - 22: 22
 - 23: 23
 - 24: 24
 - 25: 25
 - 26: 26
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
