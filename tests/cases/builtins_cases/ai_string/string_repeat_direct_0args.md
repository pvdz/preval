# Preval test case

# string_repeat_direct_0args.md

> Builtins cases > Ai string > String repeat direct 0args
>
> Test 'repeat' called directly with zero arguments on a string instance

## Input

`````js filename=intro
$("abc".repeat());
// Expected: "abc"
`````


## Settled


`````js filename=intro
$(``);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(``);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_repeat;
let tmpCalleeParam = ``;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
