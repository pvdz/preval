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


## PST Settled
With rename=true

`````js filename=intro
$( "/1/xyz" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinLhs = new $regex_constructor(`1`, ``);
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
 - 1: '/1/xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
