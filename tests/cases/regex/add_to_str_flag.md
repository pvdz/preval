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


## PST Settled
With rename=true

`````js filename=intro
$( "/foo/gxyz" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinLhs = new $regex_constructor(`foo`, `g`);
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}xyz`;
$(tmpCalleeParam);
`````


## Todos triggered


None


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
