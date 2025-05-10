# Preval test case

# spread_bad_end.md

> Normalize > Pattern > Spread bad end
>
> Only valid spread literal is a string

## Input

`````js filename=intro
$('before');
$([1, 2, ...3]);
$('after');
`````


## Settled


`````js filename=intro
$(`before`);
throw `Preval: Array spread on non-string primitive must crash (caused by \`let tmpCalleeParam = [1, 2, ...3];\`)`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
throw `Preval: Array spread on non-string primitive must crash (caused by \`let tmpCalleeParam = [1, 2, ...3];\`)`;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before" );
throw "Preval: Array spread on non-string primitive must crash (caused by `let tmpCalleeParam = [1, 2, ...3];`)";
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
