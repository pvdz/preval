# Preval test case

# shift_empty.md

> Array > Manipulation > Shift > Shift empty
>
> Remove element from array

## Input

`````js filename=intro
const ARR = [];
const NOOP = function() {
$(ARR);
};
const n = ARR.shift();
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````


## Settled


`````js filename=intro
const ARR /*:array*/ = [];
const NOOP /*:()=>unknown*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(undefined);
ARR.push(undefined);
$(NOOP);
$(ARR);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const ARR = [];
const NOOP = function () {
  $(ARR);
};
$(undefined);
ARR.push(undefined);
$(NOOP);
$(ARR);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
$( undefined );
a.push( undefined );
$( b );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: '<function>'
 - 3: [undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
