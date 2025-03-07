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
const r /*:(unknown)=>number*/ = function ($$0) {
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
const r = function (n) {
  if (n > 100) {
    return 10;
  } else {
    const tmpReturnArg = r(n + 1);
    return tmpReturnArg;
  }
};
$(r($(10)));
`````

## Pre Normal


`````js filename=intro
const f = function r($$0) {
  let n = $$0;
  debugger;
  if (n > 100) return 10;
  return r(n + 1);
};
const a = $(10);
const x = f(a);
$(x);
`````

## Normalized


`````js filename=intro
const r = function ($$0) {
  let n = $$0;
  debugger;
  const tmpIfTest = n > 100;
  if (tmpIfTest) {
    return 10;
  } else {
    const tmpCallCallee = r;
    const tmpCalleeParam = n + 1;
    const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
    return tmpReturnArg;
  }
};
const f = r;
const a = $(10);
const x = f(a);
$(x);
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
