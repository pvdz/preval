# Preval test case

# infinity.md

> Normalize > Call > Bad callees > Infinity
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
Infinity();
$('after');
`````


## Settled


`````js filename=intro
$(`before`);
Infinity();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`Infinity()\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
Infinity();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`Infinity()\``;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before" );
Infinity.undefined();
throw "[Preval]: Call expression with illegal callee must crash before this line ; `Infinity()`";
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
