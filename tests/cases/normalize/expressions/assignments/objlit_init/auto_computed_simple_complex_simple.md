# Preval test case

# auto_computed_simple_complex_simple.md

> Normalize > Expressions > Assignments > Objlit init > Auto computed simple complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = { b: $(1) }) });
a[$("b")] = 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = { b: $(1) }) });
a[$(`b`)] = 2;
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
const tmpAssignComMemLhsObj = a;
const tmpAssignComMemLhsProp = $(`b`);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = $(1);
const a = { b: tmpObjLitVal$1 };
const tmpCalleeParam = { x: a };
$(tmpCalleeParam);
const tmpAssignComMemLhsProp = $(`b`);
a[tmpAssignComMemLhsProp] = 2;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '{"b":"1"}' }
 - 3: 'b'
 - 4: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
