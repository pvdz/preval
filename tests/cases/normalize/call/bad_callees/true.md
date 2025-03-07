# Preval test case

# true.md

> Normalize > Call > Bad callees > True
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
true();
$('after');
`````

## Settled


`````js filename=intro
$(`before`);
true();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`true()\``;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
true();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`true()\``;
`````

## Pre Normal


`````js filename=intro
$(`before`);
true();
$(`after`);
`````

## Normalized


`````js filename=intro
$(`before`);
true();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`true()\``;
`````

## PST Settled
With rename=true

`````js filename=intro
$( "before" );
true.undefined();
throw "[Preval]: Call expression with illegal callee must crash before this line ; `true()`";
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
