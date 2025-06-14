# Preval test case

# string_split_call_ctx_2args.md

> Builtins cases > Ai string > String split call ctx 2args
>
> Test 'split' called with .call and object context, two arguments

## Input

`````js filename=intro
$(String.prototype.split.call("abc", "b", 1));
// Expected: ["a"]
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`a`];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`a`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a" ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.split;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, `b`, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['a']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
