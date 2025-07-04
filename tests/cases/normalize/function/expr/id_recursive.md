# Preval test case

# id_recursive.md

> Normalize > Function > Expr > Id recursive
>
> Function recursion by referencing a function expr id

## Input

`````js filename=intro
const f = function r(n) {
  if (n > 100) return 10;
  return r(n + 1);
};
const a = $(10);
const x = f(a);
$(x);
`````


## Settled


`````js filename=intro
const r /*:(unknown)=>number*/ = function $pcompiled($$0) {
  const n /*:unknown*/ = $$0;
  debugger;
  const tmpIfTest /*:boolean*/ = n > 100;
  if (tmpIfTest) {
    return 10;
  } else {
    const tmpCalleeParam /*:primitive*/ = n + 1;
    const tmpReturnArg /*:number*/ = r(tmpCalleeParam);
    return tmpReturnArg;
  }
};
const a /*:unknown*/ = $(10);
const x /*:number*/ = r(a);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const r = function $pcompiled(n) {
  if (n > 100) {
    return 10;
  } else {
    const tmpReturnArg = r(n + 1);
    return tmpReturnArg;
  }
};
$(r($(10)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = c > 100;
  if (d) {
    return 10;
  }
  else {
    const e = c + 1;
    const f = a( e );
    return f;
  }
};
const g = $( 10 );
const h = a( g );
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const r = function ($$0) {
  let n = $$0;
  debugger;
  const tmpIfTest = n > 100;
  if (tmpIfTest) {
    return 10;
  } else {
    const tmpCallCallee = r;
    let tmpCalleeParam = n + 1;
    const tmpReturnArg = r(tmpCalleeParam);
    return tmpReturnArg;
  }
};
const f = r;
const a = $(10);
const x = f(a);
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
