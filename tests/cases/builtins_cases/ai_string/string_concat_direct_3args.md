# Preval test case

# string_concat_direct_3args.md

> Builtins cases > Ai string > String concat direct 3args
>
> Test String.prototype.concat called directly with three arguments

## Input

`````js filename=intro
$("abc".concat("d", "e", "f"));
// Expected: "abcdef"
`````


## Settled


`````js filename=intro
$(`abcdef`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abcdef`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abcdef" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_concat;
let tmpCalleeParam = `abcdef`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abcdef'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
