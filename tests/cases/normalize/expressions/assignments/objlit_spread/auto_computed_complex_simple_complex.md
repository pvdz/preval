# Preval test case

# auto_computed_complex_simple_complex.md

> normalize > expressions > assignments > objlit_spread > auto_computed_complex_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = { b: $(1) }) });
$(a)["b"] = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
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
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
$(tmpCalleeParam);
const tmpAssignMemLhsObj = $(a);
const tmpAssignComputedObj = tmpAssignMemLhsObj;
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj['b'] = tmpAssignComputedRhs;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: { b: '1' }
 - 4: 2
 - 5: { b: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same