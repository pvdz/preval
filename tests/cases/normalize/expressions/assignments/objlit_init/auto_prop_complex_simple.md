# Preval test case

# auto_prop_complex_simple.md

> normalize > expressions > assignments > objlit_init > auto_prop_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = { b: $(1) }) });
$(a).b = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal$1 = $(1);
a = { b: tmpObjLitVal$1 };
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = $(1);
const SSA_a = { b: tmpObjLitVal$1 };
const tmpCalleeParam = { x: SSA_a };
$(tmpCalleeParam);
const tmpAssignMemLhsObj = $(SSA_a);
tmpAssignMemLhsObj.b = 2;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '{"b":"1"}' }
 - 3: { b: '1' }
 - 4: { b: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
