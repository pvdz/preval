# Preval test case

# class.md

> Pcode > Class
>
> This caused a problem at some point.

## Input

`````js filename=intro
const c = function() {
  return class {};
};
$(c)
`````


## Settled


`````js filename=intro
const c /*:()=>unknown*/ = function () {
  debugger;
  const tmpReturnArg /*:class*/ /*truthy*/ = class {};
  return tmpReturnArg;
};
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  const tmpReturnArg = class {};
  return tmpReturnArg;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = class   {

  };
  return b;
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const c = function () {
  debugger;
  const tmpReturnArg = class {};
  return tmpReturnArg;
};
$(c);
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
