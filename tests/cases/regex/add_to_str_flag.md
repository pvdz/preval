# Preval test case

# add_to_str_flag.md

> Regex > Add to str flag
>
> Regexes are objects and always get turned into a string

## Input

`````js filename=intro
$(/foo/g + "xyz");
`````

## Settled


`````js filename=intro
$(`/foo/gxyz`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`/foo/gxyz`);
`````

## Pre Normal


`````js filename=intro
$(/foo/g + `xyz`);
`````

## Normalized


`````js filename=intro
const tmpBinLhs = /foo/g;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}xyz`;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "/foo/gxyz" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '/foo/gxyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
