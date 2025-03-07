# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident logic and simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = 1 && 2)]: 10 });
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { [2]: 10 };
$(tmpCalleeParam);
$(2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [2]: 10 });
$(2);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = 1 && 2)]: 10 });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = 1;
if (a) {
  a = 2;
} else {
}
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { [ 2 ]: 10 };
$( a );
$( 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { 2: '10' }
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
