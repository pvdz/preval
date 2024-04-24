# Preval test case

# default_yes_no_no__obj_empty_str.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default yes no no  obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('pass') } } = { x: '', b: 11, c: 12 };
$(y);
`````

## Pre Normal

`````js filename=intro
const {
  x: { y: y = $(`pass`) },
} = { x: ``, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: ``, b: 11, c: 12 };
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
const objPatternBeforeDefault = ``.y;
let y = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $(`pass`);
  $(y);
} else {
  y = objPatternBeforeDefault;
  $(objPatternBeforeDefault);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = "".y;
let b = undefined;
const c = a === undefined;
if (c) {
  b = $( "pass" );
  $( b );
}
else {
  b = a;
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
