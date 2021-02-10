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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
