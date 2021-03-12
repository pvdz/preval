# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Switch case test > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
switch ($(1)) {
  case ({ a } = $({ a: 1, b: 2 })):
}
$(a);
`````

## Normalized

`````js filename=intro
let $tdz$__pattern_after_default = { a: 999, b: 1000 };
let a = $tdz$__pattern_after_default.a;
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
let tmpBinLhs;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
a = tmpNestedAssignObjPatternRhs.a;
tmpBinLhs = tmpNestedAssignObjPatternRhs;
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
$(a);
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = { a: 999, b: 1000 };
$tdz$__pattern_after_default.a;
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const SSA_a = tmpNestedAssignObjPatternRhs.a;
const tmpIfTest = tmpNestedAssignObjPatternRhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchCaseToStart <= 0;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '1', b: '2' }
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
