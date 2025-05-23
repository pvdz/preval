# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = !arg);
}
$(f());
$(a, arg);
`````


## Settled


`````js filename=intro
$(false);
$(false, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
$(false, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false );
$( false, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  a = !arg;
  return a;
};
let arg = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, arg);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: false, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
