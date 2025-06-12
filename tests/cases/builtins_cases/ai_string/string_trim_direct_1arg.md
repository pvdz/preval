# Preval test case

# string_trim_direct_1arg.md

> Builtins cases > Ai string > String trim direct 1arg
>
> Test String.prototype.trim called directly with one argument

## Input

`````js filename=intro
$("  abc  ".trim(1));
// Expected: "abc"
`````


## Settled


`````js filename=intro
$(`abc`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abc`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abc" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_trim;
let tmpCalleeParam = `abc`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
