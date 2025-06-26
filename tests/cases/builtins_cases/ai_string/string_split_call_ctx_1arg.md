# Preval test case

# string_split_call_ctx_1arg.md

> Builtins cases > Ai string > String split call ctx 1arg
>
> Test 'split' called with .call and object context, one argument

## Input

`````js filename=intro
$(String.prototype.split.call("abc", "b"));
// Expected: ["a", "c"]
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`a`, `c`];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`a`, `c`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "c" ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.split;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, `b`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['a', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
