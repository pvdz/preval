# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Statement > Return > Auto ident upd pi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f() {
  return ++b;
}
$(f());
$(a, b);
`````

## Settled


`````js filename=intro
$(2);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$({ a: 999, b: 1000 }, 2);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return ++b;
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
  b = b + 1;
  return b;
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
$( 2 );
const a = {
  a: 999,
  b: 1000,
};
$( a, 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
