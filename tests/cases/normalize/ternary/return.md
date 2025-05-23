# Preval test case

# return.md

> Normalize > Ternary > Return
>
> Example of rewriting a return statement with ternary

## Input

`````js filename=intro
function f() {
  let a = 1, b = 2, c = 3;
  return a ? b : c;
}
$(f());
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
let f = function () {
  debugger;
  let a = 1;
  let b = 2;
  let c = 3;
  let tmpReturnArg = undefined;
  if (a) {
    tmpReturnArg = b;
    return tmpReturnArg;
  } else {
    tmpReturnArg = c;
    return tmpReturnArg;
  }
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
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
