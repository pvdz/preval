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
const g /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(g);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {});
`````

## Pre Normal


`````js filename=intro
const f = function g() {
  debugger;
};
$(f);
`````

## Normalized


`````js filename=intro
const g = function () {
  debugger;
  return undefined;
};
const f = g;
$(g);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( a );
`````

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
