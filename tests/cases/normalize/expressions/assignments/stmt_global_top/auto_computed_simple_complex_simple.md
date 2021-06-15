# Preval test case

# auto_computed_simple_complex_simple.md

> Normalize > Expressions > Assignments > Stmt global top > Auto computed simple complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
a = { b: $(1) };
a[$("b")] = 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
a = { b: $(1) };
a[$(`b`)] = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
const tmpAssignComMemLhsObj = a;
const tmpAssignComMemLhsProp = $(`b`);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpAssignComMemLhsProp = $(`b`);
const a = { b: tmpObjLitVal };
a[tmpAssignComMemLhsProp] = 2;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'b'
 - 3: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
