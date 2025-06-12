# Preval test case

# string_concat_direct_2args.md

> Builtins cases > Ai string > String concat direct 2args
>
> Test String.prototype.concat called directly with two arguments

## Input

`````js filename=intro
$("abc".concat("d", "e"));
// Expected: "abcde"
`````


## Settled


`````js filename=intro
$(`abcde`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abcde`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abcde" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_concat;
let tmpCalleeParam = `abcde`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abcde'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
