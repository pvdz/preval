# Preval test case

# string_substr_spread_second_4args.md

> Builtins cases > Ai string > String substr spread second 4args
>
> Test String.prototype.substr called with spread arguments as second argument (4 elements, only first used, rest ignored)

## Input

`````js filename=intro
const str = $("hello");
const arg1 = 1;
const extra = [3, 4, 5, 6];
const result = str.substr(arg1, ...extra);
$(result); // Expected: "ello"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.substr;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `substr`, 1, 3, 4, 5, 6);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.substr(1, 3, 4, 5, 6));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.substr;
const c = $dotCall( b, a, "substr", 1, 3, 4, 5, 6 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const arg1 = 1;
const extra = [3, 4, 5, 6];
const tmpMCF = str.substr;
const result = $dotCall(tmpMCF, str, `substr`, arg1, ...extra);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'ell'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
