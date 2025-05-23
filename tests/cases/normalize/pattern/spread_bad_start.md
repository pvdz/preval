# Preval test case

# spread_bad_start.md

> Normalize > Pattern > Spread bad start
>
> Only valid spread literal is a string

## Input

`````js filename=intro
$('before');
$([...3, 4,5 ]);
$('after');
`````


## Settled


`````js filename=intro
$(`before`);
throw `Preval: Array spread on non-string primitive must crash (caused by \`let tmpCalleeParam = [...3, 4, 5];\`)`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
throw `Preval: Array spread on non-string primitive must crash (caused by \`let tmpCalleeParam = [...3, 4, 5];\`)`;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before" );
throw "Preval: Array spread on non-string primitive must crash (caused by `let tmpCalleeParam = [...3, 4, 5];`)";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`before`);
throw `Preval: Array spread on non-string primitive must crash (caused by \`let tmpCalleeParam = [...3, 4, 5];\`)`;
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
