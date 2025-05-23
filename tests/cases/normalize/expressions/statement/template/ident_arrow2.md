# Preval test case

# ident_arrow2.md

> Normalize > Expressions > Statement > Template > Ident arrow2
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Options

Test output serialization false negative

- skipEval

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${function() {
  if (x) y;
}}  after`);
$(a);
`````


## Settled


`````js filename=intro
$(`before  function(){}  after`);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  function(){}  after`);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before  function(){}  after" );
const a = {
  a: 999,
  b: 1000,
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
let tmpCalleeParam$1 = function () {
  debugger;
  if (x) {
    y;
    return undefined;
  } else {
    return undefined;
  }
};
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
