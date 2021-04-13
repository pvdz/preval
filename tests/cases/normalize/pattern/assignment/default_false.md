# Preval test case

# default_false.md

> Normalize > Pattern > Assignment > Default false
>
> Assignment pattern with default

#TODO

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
({ a: b = $('default') } = { a: $('prop') });
$(b);
`````

## Normalized

`````js filename=intro
let b = undefined;
const tmpObjLitVal = $('prop');
const tmpAssignObjPatternRhs = { a: tmpObjLitVal };
const objPatternBeforeDefault = tmpAssignObjPatternRhs.a;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  b = $('default');
} else {
  b = objPatternBeforeDefault;
}
$(b);
`````

## Output

`````js filename=intro
let b = undefined;
const tmpObjLitVal = $('prop');
const tmpAssignObjPatternRhs = { a: tmpObjLitVal };
const objPatternBeforeDefault = tmpAssignObjPatternRhs.a;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  b = $('default');
} else {
  b = objPatternBeforeDefault;
}
$(b);
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