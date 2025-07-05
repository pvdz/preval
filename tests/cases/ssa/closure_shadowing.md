# Preval test case

# closure_shadowing.md

> Ssa > Closure shadowing
>
> We could SSA a binding in a closure if the first ref is a write, not in a loop, and all subsequent refs can reach the first write.

## Input

`````js filename=intro
function f() {
  let x = 10;
  const g = function(){ 
    x = 20;
    $(x);
  };
  x = 30;
  if ($) return g();
}
if ($) $(f());
`````


## Settled


`````js filename=intro
if ($) {
  $(20);
  $(undefined);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(20);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 20 );
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = 10;
  const g = function () {
    debugger;
    x = 20;
    $(x);
    return undefined;
  };
  x = 30;
  if ($) {
    const tmpReturnArg = g();
    return tmpReturnArg;
  } else {
    return undefined;
  }
};
if ($) {
  let tmpCalleeParam = f();
  $(tmpCalleeParam);
} else {
}
`````


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 20
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
