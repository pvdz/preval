# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Return > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
function f() {
  return (a = b = 2);
}
$(f());
$(a, b, c);
`````

## Settled


`````js filename=intro
$(2);
$(2, 2, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(2, 2, 2);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = b = 2);
};
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
$(f());
$(a, b, c);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  b = 2;
  a = 2;
  return a;
};
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b, c);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( 2, 2, 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 2, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
