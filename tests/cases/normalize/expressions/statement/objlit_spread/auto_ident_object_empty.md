# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident object empty
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...{} });
$(a);
`````

## Settled


`````js filename=intro
const tmpObjSpreadArg /*:object*/ = {};
({ ...tmpObjSpreadArg });
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjSpreadArg = {};
({ ...tmpObjSpreadArg });
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...{} });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjSpreadArg = {};
({ ...tmpObjSpreadArg });
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
{ ... a };
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````

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
