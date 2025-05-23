# Preval test case

# func_group_call.md

> Normalize > Call > Func group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
function f() {
  const y = (1, 2, $(parseInt))()
  return $(y);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($Number_parseInt);
const y /*:unknown*/ = tmpCallComplexCallee();
const tmpReturnArg /*:unknown*/ = $(y);
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallComplexCallee = $($Number_parseInt);
$($(tmpCallComplexCallee()));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_parseInt );
const b = a();
const c = $( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpCallComplexCallee = $($Number_parseInt);
  const y = tmpCallComplexCallee();
  const tmpReturnArg = $(y);
  return tmpReturnArg;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: NaN
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
