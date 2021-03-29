# Preval test case

# if_test.md

> Normalize > Expressions > If test
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x;
if (({ x } = { x: $(1) })) $(2);
$(x);
`````

## Pre Normal

`````js filename=intro
let x;
if (({ x } = { x: $(1) })) $(2);
$(x);
`````

## Normalized

`````js filename=intro
let x;
let tmpIfTest;
const tmpObjLitVal = $(1);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal };
x = tmpNestedAssignObjPatternRhs.x;
tmpIfTest = tmpNestedAssignObjPatternRhs;
if (tmpIfTest) {
  $(2);
}
$(x);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal };
const SSA_x = tmpNestedAssignObjPatternRhs.x;
if (tmpNestedAssignObjPatternRhs) {
  $(2);
}
$(SSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
