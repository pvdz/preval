# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let y;
if (({ x } = 1).foo) y;
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
let y;
objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
const tmpBindingInit = objAssignPatternRhs;
const tmpIfTest = tmpBindingInit.foo;
if (tmpIfTest) {
  y;
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
objAssignPatternRhs = 1;
x = objAssignPatternRhs.x;
const tmpBindingInit = objAssignPatternRhs;
const tmpIfTest = tmpBindingInit.foo;
if (tmpIfTest) {
}
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
