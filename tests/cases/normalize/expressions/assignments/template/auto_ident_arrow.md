# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Template > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

## Options

Ignoring function serialization errors

- skipEval

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = () => {})}  after`);
$(a);
`````


## Settled


`````js filename=intro
const a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(`before  function(){}  after`);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = function () {};
$(`before  function(){}  after`);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( "before  function(){}  after" );
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
