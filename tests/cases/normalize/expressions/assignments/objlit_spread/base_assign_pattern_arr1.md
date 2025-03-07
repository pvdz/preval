# Preval test case

# base_assign_pattern_arr1.md

> Normalize > Expressions > Assignments > Objlit spread > Base assign pattern arr1
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$({ ...([b] = b) });
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:array*/ = [];
const tmpCalleeParam /*:object*/ = { ...b };
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = [];
$({ ...b });
$({ a: 999, b: 1000 }, undefined);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$({ ...([b] = b) });
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpObjSpread = undefined;
const tmpNestedAssignArrPatternRhs = b;
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpObjSpread = tmpNestedAssignArrPatternRhs;
const tmpCalleeParam = { ...tmpObjSpread };
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = { ... a };
$( b );
const c = {
  a: 999,
  b: 1000,
};
$( c, undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - 2: { a: '999', b: '1000' }, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope