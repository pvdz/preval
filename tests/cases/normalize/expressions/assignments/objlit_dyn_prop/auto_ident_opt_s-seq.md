# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident opt s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$({ [(a = (1, 2, b)?.x)]: 10 });
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { [1]: 10 };
$(tmpCalleeParam);
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [1]: 10 });
$(1);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$({ [(a = (1, 2, b)?.x)]: 10 });
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
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
const a = { [ 1 ]: 10 };
$( a );
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { 1: '10' }
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
