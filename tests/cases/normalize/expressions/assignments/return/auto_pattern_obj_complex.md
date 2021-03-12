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

## Normalized

`````js filename=intro
let f = function () {
  let tmpReturnArg;
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  a = tmpNestedAssignObjPatternRhs.a;
  tmpReturnArg = tmpNestedAssignObjPatternRhs;
  return tmpReturnArg;
};
let $tdz$__pattern_after_default = { a: 999, b: 1000 };
let a = $tdz$__pattern_after_default.a;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCalleeParam = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
  a = tmpNestedAssignObjPatternRhs.a;
  return tmpNestedAssignObjPatternRhs;
};
const $tdz$__pattern_after_default = { a: 999, b: 1000 };
let a = $tdz$__pattern_after_default.a;
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: { a: '1', b: '2' }
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
