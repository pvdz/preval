# Preval test case

# base_regex.md

> Type tracked > Typeof > Base regex
>
> If we know the type of a value without knowing the actual value, we can still resolve `typeof`

## Input

`````js filename=intro
const x = /foo/;
$(typeof x);
`````


## Settled


`````js filename=intro
$(`object`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`object`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "object" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = new $regex_constructor(`foo`, ``);
let tmpCalleeParam = typeof x;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'object'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
