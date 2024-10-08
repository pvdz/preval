# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = { x: 1, y: 2, z: 3 })) {}
$(f());
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = { x: 1, y: 2, z: 3 }) : tmpParamBare;
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
    const tmpNestedComplexRhs = { x: 1, y: 2, z: 3 };
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
$(undefined);
const tmpNestedComplexRhs /*:object*/ = { x: 1, y: 2, z: 3 };
$(tmpNestedComplexRhs);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
const a = {
  x: 1,
  y: 2,
  z: 3,
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
