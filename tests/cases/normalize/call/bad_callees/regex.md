# Preval test case

# regex.md

> Normalize > Call > Bad callees > Regex
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
/nope/();
$('after');
`````


## Settled


`````js filename=intro
$(`before`);
const tmpCallComplexCallee /*:regex*/ /*truthy*/ = new $regex_constructor(`nope`, ``);
tmpCallComplexCallee();
$(`after`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
const tmpCallComplexCallee = new $regex_constructor(`nope`, ``);
tmpCallComplexCallee();
$(`after`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before" );
const a = new $regex_constructor( "nope", "" );
a();
$( "after" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`before`);
const tmpCallComplexCallee = new $regex_constructor(`nope`, ``);
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
