# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Binary right > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

## Options

Ignoring function serialization errors

- skipEval

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = () => {}));
$(a);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const a /*:()=>undefined*/ = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const a = function () {};
$(tmpBinBothLhs + a);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  $(100) +
    (a = () => {
      debugger;
    }),
);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
a = function () {
  debugger;
  return undefined;
};
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
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
