# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident delete prop complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$({ [(a = delete $(arg).y)]: 10 });
$(a, arg);
`````

## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteObj.y;
const tmpCalleeParam /*:object*/ = { [tmpClusterSSA_a]: 10 };
$(tmpCalleeParam);
$(tmpClusterSSA_a, arg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
const tmpClusterSSA_a = delete tmpDeleteObj.y;
$({ [tmpClusterSSA_a]: 10 });
$(tmpClusterSSA_a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$({ [(a = delete $(arg).y)]: 10 });
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(tmpCalleeParam);
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
const d = { [ c ]: 10 };
$( d );
$( c, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { y: '1' }
 - 2: { true: '10' }
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
