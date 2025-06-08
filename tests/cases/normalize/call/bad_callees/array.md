# Preval test case

# array.md

> Normalize > Call > Bad callees > Array
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
[1, 2, 3]();
$('after');
`````


## Settled


`````js filename=intro
$(`before`);
const tmpCallComplexCallee /*:array*/ /*truthy*/ = [1, 2, 3];
tmpCallComplexCallee();
$(`after`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
const tmpCallComplexCallee = [1, 2, 3];
tmpCallComplexCallee();
$(`after`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before" );
const a = [ 1, 2, 3 ];
a();
$( "after" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`before`);
const tmpCallComplexCallee = [1, 2, 3];
tmpCallComplexCallee();
$(`after`);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


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
