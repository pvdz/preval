# Preval test case

# template.md

> Normalize > Call > Bad callees > Template
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
`${$}`();
$('after');
`````


## Settled


`````js filename=intro
$(`before`);
const tmpCallComplexCallee /*:string*/ = $coerce($, `string`);
tmpCallComplexCallee();
$(`after`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
const tmpCallComplexCallee = $coerce($, `string`);
tmpCallComplexCallee();
$(`after`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before" );
const a = $coerce( $, "string" );
a();
$( "after" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`before`);
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce($, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCallComplexCallee = $coerce(tmpBinLhs, `plustr`);
tmpCallComplexCallee();
$(`after`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
