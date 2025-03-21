# Preval test case

# ssa_problem2.md

> Closures > Ssa problem2
>
> Trying to come up with ssa problem cases regarding closures

## Input

`````js filename=intro
let f = function () {
  debugger;
  a = 2;
  return undefined;
};
let a = 1;
$(a);
f();
a = 3;
$(a);
f();
$(a);
a = 4;
`````


## Settled


`````js filename=intro
$(1);
$(3);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(3);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 3 );
$( 2 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
