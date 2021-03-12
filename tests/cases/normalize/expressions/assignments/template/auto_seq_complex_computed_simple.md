# Preval test case

# auto_seq_complex_computed_simple.md

> Normalize > Expressions > Assignments > Template > Auto seq complex computed simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = { b: $(1) })}  after`);
($(1), $(a))["b"] = $(2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = { b: $(1) })}  after`);
($(1), $(a))['b'] = $(2);
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
$(1);
const tmpAssignMemLhsObj = $(a);
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const SSA_a = { b: tmpObjLitVal };
const tmpCalleeParam = `before  ${SSA_a}  after`;
$(tmpCalleeParam);
$(1);
const tmpAssignMemLhsObj = $(SSA_a);
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'before [object Object] after'
 - 3: 1
 - 4: { b: '1' }
 - 5: 2
 - 6: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
