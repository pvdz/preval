# Preval test case

# return_one_param_complex.md

> Function inlining > Return one param complex
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function f(a) {
  return a;
}
$(f($(10)));
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(10);
$(tmpCalleeParam$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  return a;
};
$(f($(10)));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  return a;
};
const tmpCallCallee = f;
const tmpCalleeParam$1 = $(10);
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
