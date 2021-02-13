# Preval test case

# auto_seq_complex_computed_simple.md

> normalize > expressions > assignments > compound > auto_seq_complex_computed_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= { b: $(1) }));
($(1), $(a))["b"] = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpObjLitVal = $(1);
const tmpBinBothRhs = { b: tmpObjLitVal };
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(1);
const tmpAssignMemLhsObj = $(a);
const tmpAssignComputedObj = tmpAssignMemLhsObj;
const tmpAssignComputedProp = 'b';
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const tmpObjLitVal = $(1);
const tmpBinBothRhs = { b: tmpObjLitVal };
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(tmpCalleeParam);
$(1);
const tmpAssignMemLhsObj = $(a);
const tmpAssignComputedRhs = $(2);
tmpAssignMemLhsObj['b'] = tmpAssignComputedRhs;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: NaN
 - 3: 1
 - 4: NaN
 - 5: 2
 - 6: NaN
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
