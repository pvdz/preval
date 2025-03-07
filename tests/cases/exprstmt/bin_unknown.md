# Preval test case

# bin_unknown.md

> Exprstmt > Bin unknown
>
> Expression statements can be eliminated if we have enough information

## Input

`````js filename=intro
const x = 2 * $;
x * $;
$(x);
`````

## Settled


`````js filename=intro
$ ** 0;
const x /*:number*/ = 2 * $;
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$ ** 0;
$(2 * $);
`````

## Pre Normal


`````js filename=intro
const x = 2 * $;
x * $;
$(x);
`````

## Normalized


`````js filename=intro
const x = 2 * $;
x * 0;
$ * 0;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$ ** 0;
const a = 2 * $;
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
