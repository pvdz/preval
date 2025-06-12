# Preval test case

# string_repeat_direct_2args.md

> Builtins cases > Ai string > String repeat direct 2args
>
> Test 'repeat' called directly with two arguments on a string instance (extra arg ignored)

## Input

`````js filename=intro
$("abc".repeat(2, 42));
// Expected: "abcabc"
`````


## Settled


`````js filename=intro
$(`abcabc`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abcabc`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abcabc" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_repeat;
const tmpArgOverflow = 2;
let tmpCalleeParam = $dotCall($string_repeat, `abc`, `repeat`, tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abcabc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
