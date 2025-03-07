# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Arr element > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = function f() {}) + (a = function f() {}));
$(a);
`````

## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  return undefined;
};
const f$1 /*:()=>undefined*/ = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam /*:primitive*/ = f + f$1;
$(tmpCalleeParam);
$(f$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {};
const f$1 = function () {};
$(f + f$1);
$(f$1);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = function f() {
    debugger;
  }) +
    (a = function f$1() {
      debugger;
    }),
);
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
let tmpBinBothLhs = a;
const f$1 = function () {
  debugger;
  return undefined;
};
a = f$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
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
const b = function() {
  debugger;
  return undefined;
};
const c = a + b;
$( c );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'function() {return undefined;}function() {return undefined;}'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
