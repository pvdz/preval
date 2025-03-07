# Preval test case

# add_to_num.md

> Regex > Add to num
>
> Regexes are objects and always get turned into a string

## Input

`````js filename=intro
$(/foo/ + 1);
`````

## Settled


`````js filename=intro
$(`/foo/1`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`/foo/1`);
`````

## Pre Normal


`````js filename=intro
$(/foo/ + 1);
`````

## Normalized


`````js filename=intro
const tmpBinLhs = /foo/;
const tmpCalleeParam = tmpBinLhs + 1;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "/foo/1" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '/foo/1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
