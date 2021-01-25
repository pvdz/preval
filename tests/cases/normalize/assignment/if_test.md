# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x;
if (({ x } = { x: $(1) })) $(2);
$(x);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var tmpObjPropValue;
let x;
tmpObjPropValue = $(1);
objAssignPatternRhs = { x: tmpObjPropValue };
x = objAssignPatternRhs.x;
const tmpIfTest = objAssignPatternRhs;
if (tmpIfTest) {
  $(2);
}
$(x);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var tmpObjPropValue;
let x;
tmpObjPropValue = $(1);
objAssignPatternRhs = { x: tmpObjPropValue };
x = objAssignPatternRhs.x;
const tmpIfTest = objAssignPatternRhs;
if (tmpIfTest) {
  $(2);
}
$(x);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: 1
 - 3: undefined

Normalized calls: Same

Final output calls: Same
