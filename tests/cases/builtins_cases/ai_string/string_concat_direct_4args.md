# Preval test case

# string_concat_direct_4args.md

> Builtins cases > Ai string > String concat direct 4args
>
> Test String.prototype.concat called directly with four arguments

## Input

`````js filename=intro
$("abc".concat("d", "e", "f", "g"));
// Expected: "abcdefg"
`````


## Settled


`````js filename=intro
$(`abcdefg`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abcdefg`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abcdefg" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_concat;
let tmpCalleeParam = `abcdefg`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abcdefg'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
