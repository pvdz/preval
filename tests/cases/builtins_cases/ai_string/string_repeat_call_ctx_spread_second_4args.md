# Preval test case

# string_repeat_call_ctx_spread_second_4args.md

> Builtins cases > Ai string > String repeat call ctx spread second 4args
>
> Test 'repeat' called with .call and object context, spread as second argument (four values)

## Input

`````js filename=intro
$(String.prototype.repeat.call("abc", 2, ...$([42, null, undefined, 0])));
// Expected: "abcabc"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [42, null, undefined, 0];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
$(`abcabc`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([42, null, undefined, 0]);
[...tmpMCSP];
$(`abcabc`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 42, null, undefined, 0 ];
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
let tmpCalleeParam$1 = [42, null, undefined, 0];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, 2, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call
- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $string_repeat


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [42, null, undefined, 0]
 - 2: 'abcabc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
