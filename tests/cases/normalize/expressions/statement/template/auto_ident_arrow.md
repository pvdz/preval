# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Statement > Template > Auto ident arrow
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${() => {}}  after`);
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

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  `before  ` +
    $coerce(() => {
      debugger;
    }, `string`) +
    `  after`,
);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpCalleeParam$1 = function () {
  debugger;
  return undefined;
};
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
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

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'before function() {return undefined;} after'
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
