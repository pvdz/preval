# Preval test case

# var_func_assign_read.md

> Assigns > Var func assign read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
var x;
x = 20; // Can be made into a constant
var f = () => x = 10;
x = 30; // Can not be made into a constant because of the arrow
$(f());
$(x);
`````


## Settled


`````js filename=intro
$(10);
$(10);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
$(10);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
$( 10 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = undefined;
let x = undefined;
x = 20;
f = function () {
  debugger;
  x = 10;
  return x;
};
x = 30;
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(x);
`````


## Todos triggered


None


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
