# Preval test case

# add_to_str.md

> Regex > Add to str
>
> Regexes are objects and always get turned into a string

## Input

`````js filename=intro
$(/foo/ + "xyz");
`````


## Settled


`````js filename=intro
$(`/foo/xyz`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`/foo/xyz`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "/foo/xyz" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '/foo/xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
