# Preval test case

# regex.md

> Normalize > Templates > Static resolve > Arg > Regex
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${/foo/g}`);
`````

## Settled


`````js filename=intro
$(`/foo/g`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`/foo/g`);
`````

## Pre Normal


`````js filename=intro
$(`` + $coerce(/foo/g, `string`) + ``);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpCalleeParam$1 = /foo/g;
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "/foo/g" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '/foo/g'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
