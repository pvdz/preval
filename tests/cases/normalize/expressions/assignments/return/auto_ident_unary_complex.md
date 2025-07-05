# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = typeof $(x));
}
$(f());
$(a, x);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const tmpClusterSSA_a /*:string*/ /*truthy*/ = typeof tmpUnaryArg;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
const tmpClusterSSA_a = typeof tmpUnaryArg;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
$( b );
$( b, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpUnaryArg = $(x);
  a = typeof tmpUnaryArg;
  return a;
};
let x = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, x);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'number'
 - 3: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
