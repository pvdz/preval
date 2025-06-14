# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = typeof x);
}
$(f());
$(a, x);
`````


## Settled


`````js filename=intro
$(`number`);
$(`number`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`);
$(`number`, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "number" );
$( "number", 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  a = typeof x;
  return a;
};
let x = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'number'
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
