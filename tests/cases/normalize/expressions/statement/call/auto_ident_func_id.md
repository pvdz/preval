# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Statement > Call > Auto ident func id
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(function f() {});
$(a);
`````

## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(f);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {});
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(function f() {
  debugger;
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
const tmpCalleeParam = f;
$(f);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( a );
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
