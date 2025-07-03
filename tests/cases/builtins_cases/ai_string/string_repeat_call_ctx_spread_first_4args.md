# Preval test case

# string_repeat_call_ctx_spread_first_4args.md

> Builtins cases > Ai string > String repeat call ctx spread first 4args
>
> Test 'repeat' called with .call and object context, spread as first argument (four values)

## Input

`````js filename=intro
$(String.prototype.repeat.call("abc", ...$([2, 42, null, undefined])));
// Expected: "abcabc"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [2, 42, null, undefined];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:string*/ = $dotCall($string_repeat, `abc`, undefined, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([2, 42, null, undefined]);
$($dotCall($string_repeat, `abc`, undefined, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2, 42, null, undefined ];
const b = $( a );
const c = $dotCall( $string_repeat, "abc", undefined, ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.repeat;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam$1 = [2, 42, null, undefined];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, ...tmpMCSP);
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
 - 1: [2, 42, null, undefined]
 - 2: 'abcabc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
