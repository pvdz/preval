# Preval test case

# string_charAt_direct_1arg.md

> Builtins cases > Ai string > String charAt direct 1arg
>
> Test String.prototype.charAt called directly with one argument

## Input

`````js filename=intro
$("abc".charAt(1));
// Expected: "b"
`````


## Settled


`````js filename=intro
$(`b`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`b`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "b" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_charAt;
let tmpCalleeParam = `b`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
