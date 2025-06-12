# Preval test case

# string_fromCharCode_direct_2args.md

> Builtins cases > Ai string > String fromCharCode direct 2args
>
> Test String.fromCharCode called directly with two arguments

## Input

`````js filename=intro
$(String.fromCharCode(65, 66));
// Expected: "AB"
`````


## Settled


`````js filename=intro
$(`AB`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`AB`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "AB" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $String_fromCharCode;
let tmpCalleeParam = `AB`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'AB'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
