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

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let p = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = { a: 1, b: 2 };
    const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
    a = tmpNestedAssignObjPatternRhs.a;
    p = tmpNestedAssignObjPatternRhs;
  } else {
    p = $tdz$__pattern;
  }
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
const f = function ($tdz$__pattern) {
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = { a: 1, b: 2 };
    const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
    a = tmpNestedAssignObjPatternRhs.a;
  }
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
 - 2: undefined
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
