# Preval test case

# spread_bad_double.md

> Normalize > Pattern > Spread bad double
>
> Only valid spread literal is a string

The second crash should be DCE'd regardless

## Input

`````js filename=intro
$('before');
$([1, 2, ...3, ...4, 5, 6]);
$('after');
`````


## Settled


`````js filename=intro
$(`before`);
throw `Preval: Array spread on non-string primitive must crash (caused by \`let tmpCalleeParam = [1, 2, ...3, ...4, 5, 6];\`)`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
throw `Preval: Array spread on non-string primitive must crash (caused by \`let tmpCalleeParam = [1, 2, ...3, ...4, 5, 6];\`)`;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before" );
throw "Preval: Array spread on non-string primitive must crash (caused by `let tmpCalleeParam = [1, 2, ...3, ...4, 5, 6];`)";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`before`);
throw `Preval: Array spread on non-string primitive must crash (caused by \`let tmpCalleeParam = [1, 2, ...3, ...4, 5, 6];\`)`;
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
