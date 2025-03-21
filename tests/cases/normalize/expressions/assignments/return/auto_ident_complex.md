# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = $(b));
}
$(f());
$(a, b);
`````

## Settled


`````js filename=intro
const tmpClusterSSA_a /*:unknown*/ = $(1);
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = $(1);
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, 1);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = $(b));
};
let b = 1;
let a = { a: 999, b: 1000 };
$(f());
$(a, b);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  a = $(b);
  return a;
};
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
$( a, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
