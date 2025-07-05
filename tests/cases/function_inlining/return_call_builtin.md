# Preval test case

# return_call_builtin.md

> Function inlining > Return call builtin
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function f() {
  return $(10);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpReturnArg /*:unknown*/ = $(10);
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(10));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpReturnArg = $(10);
  return tmpReturnArg;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


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
