# Preval test case

# obj_chain_flatten.md

> Ai > Ai5 > Obj chain flatten
>
> Test flattening of object property access chains

## Input

`````js filename=intro
const obj = { a: { b: { c: 1 } } };
const x = obj.a.b.c;
$(x);

// Expected:
// const obj = { a: { b: { c: 1 } } };
// const x = obj["a.b.c"];
// $(x);
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal$1 = { c: 1 };
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCompObj$1 = obj.a;
const tmpCompObj = tmpCompObj$1.b;
const x = tmpCompObj.c;
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
