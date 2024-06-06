# Preval test case

# default_yes_no_no__obj_0.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default yes no no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('pass') } } = { x: 0, b: 11, c: 12 };
$(y);
`````

## Pre Normal


`````js filename=intro
const {
  x: { y: y = $(`pass`) },
} = { x: 0, b: 11, c: 12 };
$(y);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: 0, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
let y = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $(`pass`);
} else {
  y = objPatternBeforeDefault;
}
$(y);
`````

## Output


`````js filename=intro
const objPatternBeforeDefault = (0).y;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpClusterSSA_y = $(`pass`);
  $(tmpClusterSSA_y);
} else {
  $(objPatternBeforeDefault);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = 0.y;
const b = a === undefined;
if (b) {
  const c = $( "pass" );
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
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
