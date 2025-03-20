# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Binary left > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

## Options

Ignoring function serialization problems

- skipEval

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = () => {}) + $(100));
$(a);
`````


## Settled


`````js filename=intro
const a /*:()=>undefined*/ = function () {
  debugger;
  return undefined;
};
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = a + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = function () {};
$(a + $(100));
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
const b = $( 100 );
const c = a + b;
$( c );
$( a );
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
