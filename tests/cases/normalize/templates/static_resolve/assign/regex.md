# Preval test case

# regex.md

> Normalize > Templates > Static resolve > Assign > Regex
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = undefined;
x = `${/foo/g}`;
$(x);
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
let x = undefined;
x = `` + $coerce(/foo/g, `string`) + ``;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpCalleeParam = /foo/g;
const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = $coerce(tmpBinLhs, `plustr`);
$(x);
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
