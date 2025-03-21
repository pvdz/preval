# Preval test case

# shift_arg.md

> Array > Manipulation > Shift > Shift arg
>
> Remove elemenet from array

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const n = ARR.shift($);
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## Settled


`````js filename=intro
const ARR /*:array*/ = [`b`, `c`, `a`];
const NOOP /*:()=>unknown*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(`a`);
$(NOOP);
$(ARR);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const ARR = [`b`, `c`, `a`];
const NOOP = function () {
  $(ARR);
};
$(`a`);
$(NOOP);
$(ARR);
`````

## Pre Normal


`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  debugger;
  $(ARR);
};
const n = ARR.shift($);
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## Normalized


`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
const n = ARR.shift($);
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "b", "c", "a" ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
$( "a" );
$( b );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'a'
 - 2: '<function>'
 - 3: ['b', 'c', 'a']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
