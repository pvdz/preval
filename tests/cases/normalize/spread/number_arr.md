# Preval test case

# number_arr.md

> Normalize > Spread > Number arr
>
> Spread on number is an error

## Input

`````js filename=intro
const x = 100;
$([...x]);
$('fail');
`````


## Settled


`````js filename=intro
[...100];
throw `[Preval]: Array spread must crash before this line`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
[...100];
throw `[Preval]: Array spread must crash before this line`;
`````


## PST Settled
With rename=true

`````js filename=intro
[ ...100 ];
throw "[Preval]: Array spread must crash before this line";
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
