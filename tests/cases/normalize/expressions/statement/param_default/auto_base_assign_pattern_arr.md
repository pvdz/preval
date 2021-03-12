# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Param default > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
function f(p = ([b] = $([$(2)]))) {}
$(f());
$(a, b);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? ([b] = $([$(2)])) : tmpParamDefault;
};
let b = [];
let a = { a: 999, b: 1000 };
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpArrElement = $(2);
    const tmpCalleeParam = [tmpArrElement];
    const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    b = arrPatternSplat[0];
    p = tmpNestedAssignArrPatternRhs;
  } else {
    p = tmpParamDefault;
  }
};
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpArrElement = $(2);
    const tmpCalleeParam = [tmpArrElement];
    const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    b = arrPatternSplat[0];
  }
};
let b = [];
const a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: undefined
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
