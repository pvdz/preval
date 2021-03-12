# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Param default > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
function f(p = ({ a } = $({ a: 1, b: 2 }))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? ({ a } = $({ a: 1, b: 2 })) : tmpParamDefault;
};
let { a } = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = { a: 1, b: 2 };
    const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
    a = tmpNestedAssignObjPatternRhs.a;
    p = tmpNestedAssignObjPatternRhs;
  } else {
    p = tmpParamDefault;
  }
};
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = { a: 1, b: 2 };
    const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
    a = tmpNestedAssignObjPatternRhs.a;
  }
};
const bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: undefined
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
