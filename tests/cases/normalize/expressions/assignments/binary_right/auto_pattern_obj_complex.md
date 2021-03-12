# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Binary right > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$($(100) + ({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Normalized

`````js filename=intro
let $tdz$__pattern_after_default = { a: 999, b: 1000 };
let a = $tdz$__pattern_after_default.a;
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
let tmpBinBothRhs;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
a = tmpNestedAssignObjPatternRhs.a;
tmpBinBothRhs = tmpNestedAssignObjPatternRhs;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = { a: 999, b: 1000 };
$tdz$__pattern_after_default.a;
const tmpBinBothLhs = $(100);
const tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
const SSA_a = tmpNestedAssignObjPatternRhs.a;
const tmpCalleeParam = tmpBinBothLhs + tmpNestedAssignObjPatternRhs;
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '1', b: '2' }
 - 3: '100[object Object]'
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
