# Preval test case

# auto_computed_simple_complex_simple.md

> Normalize > Expressions > Assignments > Param default > Auto computed simple complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = { b: $(1) })) {}
$(f());
a[$("b")] = 2;
$(a);
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
$(undefined);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`b`);
const tmpNestedComplexRhs /*:object*/ = { b: tmpObjLitVal };
tmpNestedComplexRhs[tmpAssignComMemLhsProp] = 2;
$(tmpNestedComplexRhs);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
$(undefined);
const tmpAssignComMemLhsProp = $(`b`);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
tmpNestedComplexRhs[tmpAssignComMemLhsProp] = 2;
$(tmpNestedComplexRhs);
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
a[$(`b`)] = 2;
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
const tmpAssignComMemLhsObj = a;
const tmpAssignComMemLhsProp = $(`b`);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( undefined );
const b = $( "b" );
const c = { b: a };
c[b] = 2;
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: 'b'
 - 4: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
