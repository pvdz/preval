# Preval test case

# func_expr_normalize.md

> Ai > Ai5 > Func expr normalize
>
> Test normalization of arrow functions to function expressions

## Input

`````js filename=intro
const f = (x) => x + 1;
const y = f(1);
$(y);

// Expected:
// const f = function(x) { return x + 1; };
// const y = f(1);
// $(y);
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0) {
  let x = $$0;
  debugger;
  const tmpReturnArg = x + 1;
  return tmpReturnArg;
};
const y = f(1);
$(y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
