# Preval test case

# string_concat_direct_1arg.md

> Builtins cases > Ai string > String concat direct 1arg
>
> Test String.prototype.concat called directly with one argument

## Input

`````js filename=intro
$("abc".concat("d"));
// Expected: "abcd"
`````


## Settled


`````js filename=intro
$(`abcd`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abcd`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abcd" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_concat;
let tmpCalleeParam = `abcd`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abcd'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
