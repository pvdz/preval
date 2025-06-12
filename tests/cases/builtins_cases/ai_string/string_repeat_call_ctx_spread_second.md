# Preval test case

# string_repeat_call_ctx_spread_second.md

> Builtins cases > Ai string > String repeat call ctx spread second
>
> Test 'repeat' called with .call and object context, spread as second argument (three values)

## Input

`````js filename=intro
$(String.prototype.repeat.call("abc", 2, ...$([42, null, undefined])));
// Expected: "abcabc"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [42, null, undefined];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
$(`abcabc`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([42, null, undefined]);
[...tmpMCSP];
$(`abcabc`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 42, null, undefined ];
const b = $( a );
[ ...b ];
$( "abcabc" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.repeat;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam$1 = [42, null, undefined];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, 2, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $string_repeat


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [42, null, undefined]
 - 2: 'abcabc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
