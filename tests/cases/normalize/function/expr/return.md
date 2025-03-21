# Preval test case

# return.md

> Normalize > Function > Expr > Return
>
> a func expr is slightly different from func expr

## Input

`````js filename=intro
const f = function g() {
  return $(1)
};
$(f());
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1));
`````

## Pre Normal


`````js filename=intro
const f = function g() {
  debugger;
  return $(1);
};
$(f());
`````

## Normalized


`````js filename=intro
const g = function () {
  debugger;
  const tmpReturnArg = $(1);
  return tmpReturnArg;
};
const f = g;
const tmpCalleeParam = g();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
