# Preval test case

# string_concat_prop.md

> Ai > Ai5 > String concat prop
>
> Test simplification of string concatenation property access

## Input

`````js filename=intro
const obj = { "a": 1, "b": 2 };
const x = obj["a" + ""];
const y = obj["b" + ""];
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
const tmpCalleeParam = `a`;
const x = tmpCompObj[tmpCalleeParam];
const tmpCompObj$1 = obj;
const tmpCalleeParam$1 = `b`;
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
