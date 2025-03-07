# Preval test case

# add_to_str_no_coerce.md

> Regex > Add to str no coerce
>
> Regexes are objects and always get turned into a string

## Input

`````js filename=intro
$(/1/ + "xyz");
`````

## Settled


`````js filename=intro
$(`/1/xyz`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`/1/xyz`);
`````

## Pre Normal


`````js filename=intro
$(/1/ + `xyz`);
`````

## Normalized


`````js filename=intro
const tmpBinLhs = /1/;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}xyz`;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "/1/xyz" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '/1/xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
