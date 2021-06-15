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
$(`before  ` + ({ a: a } = $({ a: 1, b: 2 })) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
let tmpBinBothRhs = undefined;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
a = tmpNestedAssignObjPatternRhs.a;
tmpBinBothRhs = tmpNestedAssignObjPatternRhs;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
const tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
const tmpBinLhs = `before  ` + tmpNestedAssignObjPatternRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
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
