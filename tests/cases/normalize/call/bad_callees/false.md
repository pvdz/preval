# Preval test case

# false.md

> Normalize > Call > Bad callees > False
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
false();
$('after');
`````


## Settled


`````js filename=intro
$(`before`);
false();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`false()\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
false();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`false()\``;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before" );
false.undefined();
throw "[Preval]: Call expression with illegal callee must crash before this line ; `false()`";
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
