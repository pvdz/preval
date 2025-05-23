# Preval test case

# number.md

> Normalize > Call > Bad callees > Number
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
500();
$('after');
`````


## Settled


`````js filename=intro
$(`before`);
throw `[Preval] Attempting to call a value that cannot be called: \`500();\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
throw `[Preval] Attempting to call a value that cannot be called: \`500();\``;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before" );
throw "[Preval] Attempting to call a value that cannot be called: `500();`";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`before`);
throw `[Preval] Attempting to call a value that cannot be called: \`500();\``;
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
