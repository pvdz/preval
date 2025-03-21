# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Binary right > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = function f() {}));
$(a);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const f /*:()=>undefined*/ = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + f;
$(tmpCalleeParam);
$(f);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const f = function () {};
$(tmpBinBothLhs + f);
$(f);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  $(100) +
    (a = function f() {
      debugger;
    }),
);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const f = function () {
  debugger;
  return undefined;
};
a = f;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
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
 - 1: 100
 - 2: '100function() {return undefined;}'
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
