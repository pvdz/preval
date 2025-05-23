# Preval test case

# null.md

> Normalize > Call > Bad callees > Null
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
null();
$('after');
`````


## Settled


`````js filename=intro
$(`before`);
throw `[Preval] Attempting to call a value that cannot be called: \`null();\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
throw `[Preval] Attempting to call a value that cannot be called: \`null();\``;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before" );
throw "[Preval] Attempting to call a value that cannot be called: `null();`";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`before`);
throw `[Preval] Attempting to call a value that cannot be called: \`null();\``;
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
