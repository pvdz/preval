# Preval test case

# auto_prop_simple_simple.md

> Normalize > Expressions > Assignments > Param default > Auto prop simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = { b: $(1) })) {}
$(f());
a.b = 2;
$(a);
`````

## Settled


`````js filename=intro
$(1);
$(undefined);
const tmpNestedComplexRhs /*:object*/ = { b: 2 };
$(tmpNestedComplexRhs);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(undefined);
$({ b: 2 });
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = { b: $(1) }) : tmpParamBare;
};
let a = { a: 999, b: 1000 };
$(f());
a.b = 2;
$(a);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = $(1);
    const tmpNestedComplexRhs = { b: tmpObjLitVal };
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
a.b = 2;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( undefined );
const a = { b: 2 };
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
