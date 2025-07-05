# Preval test case

# var_func_block.md

> Normalize > Hoisting > Base > Var func block
>
> Hosting in a block should end up in the parent

## Input

`````js filename=intro
function f() {
  $(x);
  {
    var x = 10;
  }
  $(x);
  return x;
}
$(f());
`````


## Settled


`````js filename=intro
$(undefined);
$(10);
$(10);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(10);
$(10);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 10 );
$( 10 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  $(undefined);
  x = 10;
  $(x);
  return x;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 10
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
