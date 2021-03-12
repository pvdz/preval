# Preval test case

# auto_prop_complex_simple.md

> Normalize > Expressions > Assignments > Param default > Auto prop complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = { b: $(1) })) {}
$(f());
$(a).b = 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = { b: $(1) }) : tmpParamDefault;
};
let a = { a: 999, b: 1000 };
$(f());
$(a).b = 2;
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = $(1);
    const tmpNestedComplexRhs = { b: tmpObjLitVal };
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = tmpParamDefault;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = $(1);
    const tmpNestedComplexRhs = { b: tmpObjLitVal };
    a = tmpNestedComplexRhs;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: { b: '1' }
 - 4: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
