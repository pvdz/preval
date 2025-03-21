# Preval test case

# return_second_param_complex.md

> Function inlining > Return second param complex
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function f(a, b) {
  return b;
}
$(f($(10), $(20)));
`````

## Settled


`````js filename=intro
$(10);
const tmpCalleeParam$3 /*:unknown*/ = $(20);
$(tmpCalleeParam$3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
$($(20));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  return b;
};
$(f($(10), $(20)));
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  return b;
};
const tmpCallCallee = f;
const tmpCalleeParam$1 = $(10);
const tmpCalleeParam$3 = $(20);
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1, tmpCalleeParam$3);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 10 );
const a = $( 20 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
