# Preval test case

# string_fromCharCode_direct_1arg.md

> Builtins cases > Ai string > String fromCharCode direct 1arg
>
> Test String.fromCharCode called directly with one argument

## Input

`````js filename=intro
$(String.fromCharCode(65));
// Expected: "A"
`````


## Settled


`````js filename=intro
$(`A`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`A`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "A" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $String_fromCharCode;
let tmpCalleeParam = `A`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'A'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
