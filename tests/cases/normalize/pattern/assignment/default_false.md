# Preval test case

# default_false.md

> Normalize > Pattern > Assignment > Default false
>
> Assignment pattern with default

## Input

`````js filename=intro
let b
({
  a: b = $('default')
} = {
  a: $('prop')
});
$(b);
`````

## Pre Normal


`````js filename=intro
let b;
({ a: b = $(`default`) } = { a: $(`prop`) });
$(b);
`````

## Normalized


`````js filename=intro
let b = undefined;
const tmpObjLitVal = $(`prop`);
const tmpAssignObjPatternRhs = { a: tmpObjLitVal };
const objPatternBeforeDefault = tmpAssignObjPatternRhs.a;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  b = $(`default`);
} else {
  b = objPatternBeforeDefault;
}
$(b);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(`prop`);
const tmpIfTest = tmpObjLitVal === undefined;
if (tmpIfTest) {
  const tmpClusterSSA_b = $(`default`);
  $(tmpClusterSSA_b);
} else {
  $(tmpObjLitVal);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "prop" );
const b = a === undefined;
if (b) {
  const c = $( "default" );
  $( c );
}
else {
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'prop'
 - 2: 'prop'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
