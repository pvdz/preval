# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Return > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = function f() {});
}
$(f());
$(a);
`````

## Settled


`````js filename=intro
const f$1 /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(f$1);
$(f$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f$1 = function () {};
$(f$1);
$(f$1);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = function f$1() {
    debugger;
  });
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const f$1 = function () {
    debugger;
    return undefined;
  };
  a = f$1;
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
const a = function() {
  debugger;
  return undefined;
};
$( a );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
