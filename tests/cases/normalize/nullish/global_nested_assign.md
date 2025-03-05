# Preval test case

# global_nested_assign.md

> Normalize > Nullish > Global nested assign
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
const obj = {a: {b: $()}};
obj.a.b = 15;
$(obj??a??b);
`````

## Pre Normal


`````js filename=intro
const obj = { a: { b: $() } };
obj.a.b = 15;
$(obj ?? a ?? b);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpAssignMemLhsObj = obj.a;
tmpAssignMemLhsObj.b = 15;
let tmpCalleeParam = obj;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = a;
} else {
}
const tmpIfTest$1 = tmpCalleeParam == null;
if (tmpIfTest$1) {
  tmpCalleeParam = b;
} else {
}
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$();
const tmpObjLitVal /*:object*/ = { b: 15 };
const obj /*:object*/ = { a: tmpObjLitVal };
$(obj);
`````

## PST Output

With rename=true

`````js filename=intro
$();
const a = { b: 15 };
const b = { a: a };
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: { a: '{"b":"15"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
