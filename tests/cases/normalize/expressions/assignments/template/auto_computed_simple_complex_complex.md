# Preval test case

# auto_computed_simple_complex_complex.md

> Normalize > Expressions > Assignments > Template > Auto computed simple complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = { b: $(1) })}  after`);
a[$("b")] = $(2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = { b: $(1) })}  after`);
a[$('b')] = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpTemplateExpr = a;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
const tmpAssignComMemLhsObj = a;
const tmpAssignComMemLhsProp = $('b');
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const SSA_a = { b: tmpObjLitVal };
const tmpCalleeParam = `before  ${SSA_a}  after`;
$(tmpCalleeParam);
const tmpAssignComMemLhsProp = $('b');
const tmpAssignComputedRhs = $(2);
SSA_a[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'before [object Object] after'
 - 3: 'b'
 - 4: 2
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
