# Preval test case

# default_true.md

> Normalize > Pattern > Assignment > Default true
>
> Assignment pattern with default

#TODO

## Input

`````js filename=intro
let b
({
  a: b = $('default')
} = {
  
});
$(b);
`````

## Pre Normal

`````js filename=intro
let b;
({ a: b = $(`default`) } = {});
$(b);
`````

## Normalized

`````js filename=intro
let b = undefined;
const tmpAssignObjPatternRhs = {};
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
const objPatternBeforeDefault = $ObjectPrototype.a;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpClusterSSA_b = $(`default`);
  $(tmpClusterSSA_b);
} else {
  $(objPatternBeforeDefault);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'default'
 - 2: 'default'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
