# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = [1, 2, 3])) {}
$(f());
$(a);
`````

## Settled


`````js filename=intro
$(undefined);
const tmpNestedComplexRhs /*:array*/ = [1, 2, 3];
$(tmpNestedComplexRhs);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$([1, 2, 3]);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = [1, 2, 3]) : tmpParamBare;
};
let a = { a: 999, b: 1000 };
$(f());
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
    const tmpNestedComplexRhs = [1, 2, 3];
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
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
const a = [ 1, 2, 3 ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
