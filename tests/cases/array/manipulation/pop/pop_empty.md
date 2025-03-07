# Preval test case

# pop_empty.md

> Array > Manipulation > Pop > Pop empty
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
const ARR /*:array*/ = [undefined];
const NOOP /*:()=>unknown*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(undefined);
$(NOOP);
$(ARR);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const ARR = [undefined];
const NOOP = function () {
  $(ARR);
};
$(undefined);
$(NOOP);
$(ARR);
`````

## Pre Normal


`````js filename=intro
const ARR = [];
const NOOP = function () {
  debugger;
  $(ARR);
};
const n = ARR.shift();
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## Normalized


`````js filename=intro
const ARR = [];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
const n = ARR.shift();
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ undefined ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
$( undefined );
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
