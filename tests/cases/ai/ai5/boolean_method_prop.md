# Preval test case

# boolean_method_prop.md

> Ai > Ai5 > Boolean method prop
>
> Test simplification of boolean method property access

## Input

`````js filename=intro
const obj = { "true": 1, "false": 2 };
const x = obj[true.toString()];
const y = obj[false.toString()];
$(x + y);

// Expected:
// const obj = { "true": 1, "false": 2 };
// const x = obj["true"];
// const y = obj["false"];
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
const obj = { true: 1, false: 2 };
const tmpCompObj = obj;
const tmpMCF = $boolean_toString;
const tmpCalleeParam = $dotCall($boolean_toString, true, `toString`);
const x = tmpCompObj[tmpCalleeParam];
const tmpCompObj$1 = obj;
const tmpMCF$1 = $boolean_toString;
const tmpCalleeParam$1 = $dotCall($boolean_toString, false, `toString`);
const y = tmpCompObj$1[tmpCalleeParam$1];
let tmpCalleeParam$3 = x + y;
$(tmpCalleeParam$3);
`````


## Todos triggered


None


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
