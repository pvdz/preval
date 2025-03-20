# Preval test case

# spread_bad_double.md

> Normalize > Pattern > Spread bad double
>
> Only valid spread literal is a string

The second crash should be DCE'd regardless

## Input

`````js filename=intro
$('before');
$([1, 2, ...3, ...4, 5, 6]);
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
