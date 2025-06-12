# Preval test case

# string_match_direct_4args.md

> Builtins cases > Ai string > String match direct 4args
>
> Test 'match' called directly with four arguments on a string instance (extra args ignored)

## Input

`````js filename=intro
$("abc".match("b", "extra", 42, null));
// Expected: ["b"]
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:string*/ = $dotCall($string_match, `abc`, `match`, `b`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_match, `abc`, `match`, `b`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $dotCall( $string_match, "abc", "match", "b" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_match;
const tmpArgOverflow = `b`;
let tmpCalleeParam = $dotCall($string_match, `abc`, `match`, tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_match


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
