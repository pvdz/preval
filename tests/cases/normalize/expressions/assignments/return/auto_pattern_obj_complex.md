# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Return > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
function f() {
  return ({ a } = $({ a: 1, b: 2 }));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return ({ a } = $({ a: 1, b: 2 }));
};
let { a } = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let tmpReturnArg;
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  a = tmpNestedAssignObjPatternRhs.a;
  tmpReturnArg = tmpNestedAssignObjPatternRhs;
  return tmpReturnArg;
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
const bindingPatternObjRoot = { a: 999, b: 1000 };
bindingPatternObjRoot.a;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const tmpSSA_a = tmpNestedAssignObjPatternRhs.a;
$(tmpNestedAssignObjPatternRhs);
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: { a: '1', b: '2' }
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
