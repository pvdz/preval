# Preval test case

# neg_number.md

> Normalize > Call > Bad callees > Neg number
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
(-500)();
$('after');
`````


## Settled


`````js filename=intro
$(`before`);
(-500)();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`(-500)()\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
(-500)();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`(-500)()\``;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before" );
-500.undefined();
throw "[Preval]: Call expression with illegal callee must crash before this line ; `(-500)()`";
`````


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
