# Preval test case

# string_op_prop.md

> Ai > Ai5 > String op prop
>
> Test simplification of string operation property access

## Input

`````js filename=intro
const obj = { "a": 1, "b": 2 };
const x = obj["a".split("").join("")];
const y = obj["b".split("").join("")];
$(x + y);

// Expected:
// const obj = { "a": 1, "b": 2 };
// const x = obj.a;
// const y = obj.b;
// $(x + y);
`````


## Settled


`````js filename=intro
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { a: 1, b: 2 };
const tmpCompObj = obj;
const tmpMCF = $string_split;
const tmpMCOO = $dotCall($string_split, `a`, `split`, ``);
const tmpMCF$1 = tmpMCOO.join;
const tmpCalleeParam = $dotCall(tmpMCF$1, tmpMCOO, `join`, ``);
const x = tmpCompObj[tmpCalleeParam];
const tmpCompObj$1 = obj;
const tmpMCF$3 = $string_split;
const tmpMCOO$1 = $dotCall($string_split, `b`, `split`, ``);
const tmpMCF$5 = tmpMCOO$1.join;
const tmpCalleeParam$1 = $dotCall(tmpMCF$5, tmpMCOO$1, `join`, ``);
const y = tmpCompObj$1[tmpCalleeParam$1];
let tmpCalleeParam$3 = x + y;
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_join
- (todo) arr mutation may be able to inline this method: tmpMCF$1
- (todo) arr mutation may be able to inline this method: tmpMCF$5
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
