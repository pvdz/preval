# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident unary minus complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = -$(100));
}
$(f());
$(a);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const tmpClusterSSA_a /*:number*/ = -tmpUnaryArg;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const tmpClusterSSA_a = -tmpUnaryArg;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = -$(100));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpUnaryArg = $(100);
  a = -tmpUnaryArg;
  return a;
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = -a;
$( b );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: -100
 - 3: -100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
