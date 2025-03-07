# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$({ [(a = --b)]: 10 });
$(a, b);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { [0]: 10 };
$(tmpCalleeParam);
$(0, 0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [0]: 10 });
$(0, 0);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$({ [(a = --b)]: 10 });
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { [ 0 ]: 10 };
$( a );
$( 0, 0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { 0: '10' }
 - 2: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
