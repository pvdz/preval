# Preval test case

# id_recursive2.md

> Normalize > Function > Expr > Id recursive2
>
> Function recursion by referencing a function expr id

## Input

`````js filename=intro
const RECUR_FUNC /*:(unknown)=>*/ = function($$0) {
  const THE_ARG /*:unknown*/ = $$0;
  debugger;
  const test /*:boolean*/ = THE_ARG > 100;
  if (test) {
    return 10;
  } else {
    const ARGPLUS /*:primitive*/ = THE_ARG + 1;
    const RECURRESULT /*:unknown*/ = RECUR_FUNC(ARGPLUS);
    return RECURRESULT;
  }
};
const a /*:unknown*/ = $(10);
const x /*:unknown*/ = RECUR_FUNC(a);
$(x);
`````


## Settled


`````js filename=intro
const RECUR_FUNC /*:(unknown)=>number*/ = function ($$0) {
  const $dlr_$$0 /*:unknown*/ = $$0;
  debugger;
  const test /*:boolean*/ = $dlr_$$0 > 100;
  if (test) {
    return 10;
  } else {
    const ARGPLUS /*:primitive*/ = $dlr_$$0 + 1;
    const RECURRESULT /*:number*/ = RECUR_FUNC(ARGPLUS);
    return RECURRESULT;
  }
};
const a /*:unknown*/ = $(10);
const x /*:number*/ = RECUR_FUNC(a);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const RECUR_FUNC = function ($dlr_$$0) {
  if ($dlr_$$0 > 100) {
    return 10;
  } else {
    const RECURRESULT = RECUR_FUNC($dlr_$$0 + 1);
    return RECURRESULT;
  }
};
$(RECUR_FUNC($(10)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = b > 100;
  if (c) {
    return 10;
  }
  else {
    const d = b + 1;
    const e = a( d );
    return e;
  }
};
const f = $( 10 );
const g = a( f );
$( g );
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
