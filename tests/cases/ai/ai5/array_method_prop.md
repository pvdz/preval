# Preval test case

# array_method_prop.md

> Ai > Ai5 > Array method prop
>
> Test simplification of array method property access

## Input

`````js filename=intro
const obj = { "a": 1, "b": 2 };
const x = obj[["a"][0]];
const y = obj[["b"][0]];
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
const tmpCompObj$1 = [`a`];
const tmpCalleeParam = tmpCompObj$1[0];
const x = tmpCompObj[tmpCalleeParam];
const tmpCompObj$3 = obj;
const tmpCompObj$5 = [`b`];
const tmpCalleeParam$1 = tmpCompObj$5[0];
const y = tmpCompObj$3[tmpCalleeParam$1];
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
