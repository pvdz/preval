# Preval test case

# call_nested_member2.md

> Normalize > Member access > Call nested member2
>
> Calling a nested object structure should cache one level but not break the context

## Input

`````js filename=intro
const obj = {a: {b: () => $(1)}};
obj.a.b();
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
const tmpObjLitVal$1 = function () {
  debugger;
  const tmpReturnArg = $(1);
  return tmpReturnArg;
};
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpMCOO = obj.a;
const tmpMCF = tmpMCOO.b;
$dotCall(tmpMCF, tmpMCOO, `b`);
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
