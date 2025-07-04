# Preval test case

# base.md

> Normalize > Function > Expr > Base
>
> a func expr is slightly different from func expr

## Input

`````js filename=intro
const f = function g() {};
$(f);
`````


## Settled


`````js filename=intro
const g /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
$(g);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function $pcompiled() {});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  return undefined;
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const g = function () {
  debugger;
  return undefined;
};
const f = g;
$(g);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
