# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(({ a } = $({ a: 1, b: 2 })) || ({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Normalized

`````js filename=intro
let $tdz$__pattern_after_default = { a: 999, b: 1000 };
let a = $tdz$__pattern_after_default.a;
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
a = tmpNestedAssignObjPatternRhs.a;
tmpCalleeParam = tmpNestedAssignObjPatternRhs;
if (tmpCalleeParam) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs$1 = tmpCallCallee$2(tmpCalleeParam$2);
  a = tmpNestedAssignObjPatternRhs$1.a;
  tmpCalleeParam = tmpNestedAssignObjPatternRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = { a: 999, b: 1000 };
$tdz$__pattern_after_default.a;
const tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
let SSA_a = tmpNestedAssignObjPatternRhs.a;
let SSA_tmpCalleeParam = tmpNestedAssignObjPatternRhs;
if (SSA_tmpCalleeParam) {
} else {
  const tmpCalleeParam$2 = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs$1 = $(tmpCalleeParam$2);
  SSA_a = tmpNestedAssignObjPatternRhs$1.a;
  SSA_tmpCalleeParam = tmpNestedAssignObjPatternRhs$1;
}
$(SSA_tmpCalleeParam);
$(SSA_a);
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
