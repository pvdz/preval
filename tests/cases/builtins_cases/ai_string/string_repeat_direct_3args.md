# Preval test case

# string_repeat_direct_3args.md

> Builtins cases > Ai string > String repeat direct 3args
>
> Test 'repeat' called directly with three arguments on a string instance (extra args ignored)

## Input

`````js filename=intro
$("abc".repeat(2, 42, null));
// Expected: "abcabc"
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:string*/ = $dotCall($string_repeat, `abc`, `repeat`, 2);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_repeat, `abc`, `repeat`, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $dotCall( $string_repeat, "abc", "repeat", 2 );
$( a );
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


- (todo) type trackeed tricks can possibly support static $string_repeat


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
