# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > assignments > binary_both > auto_pattern_obj_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(({ a } = $({ a: 1, b: 2 })) + ({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
a = tmpNestedAssignObjPatternRhs.a;
tmpBinBothLhs = tmpNestedAssignObjPatternRhs;
let tmpBinBothRhs;
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs$1 = tmpCallCallee$2(tmpCalleeParam$2);
a = tmpNestedAssignObjPatternRhs$1.a;
tmpBinBothRhs = tmpNestedAssignObjPatternRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let tmpBinBothLhs;
const tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
a = tmpNestedAssignObjPatternRhs.a;
tmpBinBothLhs = tmpNestedAssignObjPatternRhs;
let tmpBinBothRhs;
const tmpCalleeParam$2 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs$1 = $(tmpCalleeParam$2);
a = tmpNestedAssignObjPatternRhs$1.a;
tmpBinBothRhs = tmpNestedAssignObjPatternRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: { a: '1', b: '2' }
 - 3: '[object Object][object Object]'
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same