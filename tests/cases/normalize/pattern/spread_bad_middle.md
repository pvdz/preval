# Preval test case

# spread_bad_middle.md

> Normalize > Pattern > Spread bad middle
>
> Only valid spread literal is a string

## Input

`````js filename=intro
$('before');
$([1, 2, ...3, 4,5 ]);
$('after');
`````

## Settled


`````js filename=intro
$(`before`);
[...3];
throw `[Preval]: Array spread must crash before this line`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
[...3];
throw `[Preval]: Array spread must crash before this line`;
`````

## Pre Normal


`````js filename=intro
$(`before`);
$([1, 2, ...3, 4, 5]);
$(`after`);
`````

## Normalized


`````js filename=intro
$(`before`);
const tmpCalleeParam = [...3];
throw `[Preval]: Array spread must crash before this line`;
`````

## PST Settled
With rename=true

`````js filename=intro
$( "before" );
[ ...3 ];
throw "[Preval]: Array spread must crash before this line";
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
