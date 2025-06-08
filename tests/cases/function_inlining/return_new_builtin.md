# Preval test case

# return_new_builtin.md

> Function inlining > Return new builtin
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function f() {
  return new $(10);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpReturnArg /*:object*/ /*truthy*/ = new $(10);
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $(10));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 10 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpReturnArg = new $(10);
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
 - 1: 10
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
