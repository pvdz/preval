# Preval test case

# nan.md

> Normalize > Call > Bad callees > Nan
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
NaN();
$('after');
`````

## Settled


`````js filename=intro
$(`before`);
NaN();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`NaN()\``;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
NaN();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`NaN()\``;
`````

## Pre Normal


`````js filename=intro
$(`before`);
NaN();
$(`after`);
`````

## Normalized


`````js filename=intro
$(`before`);
NaN();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`NaN()\``;
`````

## PST Settled
With rename=true

`````js filename=intro
$( "before" );
NaN.undefined();
throw "[Preval]: Call expression with illegal callee must crash before this line ; `NaN()`";
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
