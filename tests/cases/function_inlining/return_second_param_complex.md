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
const tmpCalleeParam /*:unknown*/ = $(20);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
$($(20));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
const a = $( 20 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  return b;
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = $(10);
let tmpCalleeParam$3 = $(20);
let tmpCalleeParam = f(tmpCalleeParam$1, tmpCalleeParam$3);
$(tmpCalleeParam);
`````


## Todos triggered


None


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
