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


## PST Settled
With rename=true

`````js filename=intro
$( "/foo/g" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = ``;
let tmpCalleeParam$1 = new $regex_constructor(`foo`, `g`);
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam);
`````


## Todos triggered


None


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
