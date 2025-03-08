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
const tmpClusterSSA_a /*:string*/ = typeof tmpUnaryArg;
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

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = typeof $(x));
};
let x = 1;
let a = { a: 999, b: 1000 };
$(f());
$(a, x);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpUnaryArg = $(x);
  a = typeof tmpUnaryArg;
  return a;
};
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
$( b );
$( b, 1 );
`````

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
