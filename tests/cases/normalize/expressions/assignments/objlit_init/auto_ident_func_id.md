# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = function f() {}) });
$(a);
`````

## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam /*:object*/ = { x: f };
$(tmpCalleeParam);
$(f);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {};
$({ x: f });
$(f);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$({
  x: (a = function f() {
    debugger;
  }),
});
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const f = function () {
  debugger;
  return undefined;
};
a = f;
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
const b = { x: a };
$( b );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '"<function>"' }
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
