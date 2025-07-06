# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident arrow
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...() => {} });
$(a);
`````


## Settled


`````js filename=intro
const tmpObjSpreadArg /*:()=>undefined*/ = function $pcompiled() {
  debugger;
  return undefined;
};
({ ...tmpObjSpreadArg });
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjSpreadArg = function $pcompiled() {};
({ ...tmpObjSpreadArg });
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $pcompiled() {
  debugger;
  return undefined;
};
{ ... a };
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjSpreadArg = function () {
  debugger;
  return undefined;
};
({ ...tmpObjSpreadArg });
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
