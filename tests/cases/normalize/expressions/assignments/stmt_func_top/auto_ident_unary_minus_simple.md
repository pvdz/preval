# Preval test case

# auto_ident_unary_minus_simple.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident unary minus simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let arg = 1;

  let a = { a: 999, b: 1000 };
  a = -arg;
  $(a, arg);
}
$(f());
`````


## Settled


`````js filename=intro
$(-1, 1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1, 1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -1, 1 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let arg = 1;
  let a = { a: 999, b: 1000 };
  a = -arg;
  $(a, arg);
  return undefined;
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
 - 1: -1, 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
