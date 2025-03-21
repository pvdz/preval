# Preval test case

# undefined.md

> Normalize > Call > Bad callees > Undefined
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
undefined();
$('after');
`````


## Settled


`````js filename=intro
$(`before`);
undefined();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`undefined()\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
undefined();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`undefined()\``;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before" );
undefined.undefined();
throw "[Preval]: Call expression with illegal callee must crash before this line ; `undefined()`";
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
