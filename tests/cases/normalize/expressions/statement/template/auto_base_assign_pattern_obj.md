# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Template > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$(`before  ${({ b } = $({ b: $(2) }))}  after`);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
$(`before  ` + ({ b: b } = $({ b: $(2) })) + `  after`);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
let tmpBinBothRhs = undefined;
const tmpCallCallee$1 = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam$1 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
b = tmpNestedAssignObjPatternRhs.b;
tmpBinBothRhs = tmpNestedAssignObjPatternRhs;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpObjLitVal = $(2);
const tmpCalleeParam$1 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
const tmpBinLhs = `before  ` + tmpNestedAssignObjPatternRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
$(tmpCalleeParam);
$(a, tmpClusterSSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: 'before [object Object] after'
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
