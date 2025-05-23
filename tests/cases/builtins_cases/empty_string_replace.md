# Preval test case

# empty_string_replace.md

> Builtins cases > Empty string replace
>
>

## Input

`````js filename=intro
$(''.replace(/^/, String));
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
const tmpMCF = $string_replace;
const tmpMCP = new $regex_constructor(`^`, ``);
let tmpCalleeParam = $dotCall(tmpMCF, ``, `replace`, tmpMCP, $string_constructor);
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
