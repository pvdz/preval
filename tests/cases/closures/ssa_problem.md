# Preval test case

# ssa_problem.md

> Closures > Ssa problem
>
> Trying to come up with ssa problem cases regarding closures

## Input

`````js filename=intro
//f();
let a = 1;
$(a);
f();
a = 3;
$(a);
function f() {
  a = 2;
}
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


## Normalized
(This is what phase1 received the first time)

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


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check


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
