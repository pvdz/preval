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
if (({ x: x } = { x: $(1) })) $(2);
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
let tmpIfTest = undefined;
const tmpObjLitVal = $(1);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal };
x = tmpNestedAssignObjPatternRhs.x;
tmpIfTest = tmpNestedAssignObjPatternRhs;
if (tmpIfTest) {
  $(2);
} else {
}
$(x);
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
$(2);
$(tmpObjLitVal);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$( 2 );
$( a );
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
