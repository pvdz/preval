# Preval test case

# return_sequence.md

> Normalize > Sequence > Return sequence
>
> Returning a sequence

## Input

`````js filename=intro
function f() {
  return ($(1), $(2))
}
$(f());
`````

## Settled


`````js filename=intro
$(1);
const tmpReturnArg /*:unknown*/ = $(2);
$(tmpReturnArg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($(2));
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return $(1), $(2);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(1);
  const tmpReturnArg = $(2);
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
