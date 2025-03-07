# Preval test case

# unused_complex.md

> Normalize > Return > Unused complex
>
> Unused return statements should be eliminated

## Input

`````js filename=intro
function f() {
  $(1); // spike it
  return;
}

$(f());
`````

## Settled


`````js filename=intro
$(1);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(1);
  return;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(1);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
