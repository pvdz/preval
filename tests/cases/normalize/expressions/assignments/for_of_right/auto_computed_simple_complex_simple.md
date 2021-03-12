# Preval test case

# auto_computed_simple_complex_simple.md

> Normalize > Expressions > Assignments > For of right > Auto computed simple complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = { b: $(1) }));
a[$("b")] = 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = { b: $(1) }));
a[$('b')] = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpForOfDeclRhs = a;
let x;
for (x of tmpForOfDeclRhs) {
}
const tmpAssignComMemLhsObj = a;
const tmpAssignComMemLhsProp = $('b');
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const SSA_a = { b: tmpObjLitVal };
let x;
for (x of SSA_a) {
}
const tmpAssignComMemLhsProp = $('b');
SSA_a[tmpAssignComMemLhsProp] = 2;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
