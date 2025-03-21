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
null();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`null()\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
null();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`null()\``;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before" );
null.undefined();
throw "[Preval]: Call expression with illegal callee must crash before this line ; `null()`";
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
