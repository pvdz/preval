# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = b--);
}
$(f());
$(a, b);
`````

## Settled


`````js filename=intro
$(1);
$(1, 0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1, 0);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = b--);
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
  const tmpPostUpdArgIdent = $coerce(b, `number`);
  b = tmpPostUpdArgIdent - 1;
  a = tmpPostUpdArgIdent;
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
$( 1 );
$( 1, 0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
