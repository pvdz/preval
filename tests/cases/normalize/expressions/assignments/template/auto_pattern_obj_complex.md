# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Template > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(`before  ${({ a } = $({ a: 1, b: 2 }))}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$(`before  ` + String(({ a: a } = $({ a: 1, b: 2 }))) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
let tmpCalleeParam$1 = undefined;
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$3(tmpCalleeParam$3);
a = tmpNestedAssignObjPatternRhs.a;
tmpCalleeParam$1 = tmpNestedAssignObjPatternRhs;
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = tmpBinLhs + ``;
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$3 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$3);
const tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
const tmpBinBothRhs = String(tmpNestedAssignObjPatternRhs);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 'before [object Object] after'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
