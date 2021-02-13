# Preval test case

# auto_seq_simple_computed_simple.md

> normalize > expressions > assignments > binary_right > auto_seq_simple_computed_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = { b: $(1) }));
($(1), a)["b"] = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(1);
const tmpAssignMemLhsObj = a;
const tmpAssignComputedObj = tmpAssignMemLhsObj;
const tmpAssignComputedProp = 'b';
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(1);
const tmpAssignMemLhsObj = a;
const tmpAssignComputedRhs = $(2);
tmpAssignMemLhsObj['b'] = tmpAssignComputedRhs;
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: '100[object Object]'
 - 4: 1
 - 5: 2
 - 6: { b: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
