# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Binary left > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$((a = { b } = $({ b: $(2) })) + $(100));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
$((a = { b } = $({ b: $(2) })) + $(100));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam$1 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpCalleeParam$1 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
const SSA_b = tmpNestedAssignObjPatternRhs.b;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpNestedAssignObjPatternRhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(tmpNestedAssignObjPatternRhs, SSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: 100
 - 4: '[object Object]100'
 - 5: { b: '2' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
