# Preval test case

# default_yes_no_no__empty_str.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default yes no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } } = '';
$('bad');
`````

## Pre Normal

`````js filename=intro
const {
  x: { y: y = $(`fail`) },
} = ``;
$(`bad`);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = ``;
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
let y = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $(`fail`);
} else {
  y = objPatternBeforeDefault;
}
$(`bad`);
`````

## Output

`````js filename=intro
const objPatternNoDefault = ``.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  $(`fail`);
} else {
}
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = "".x;
const b = a.y;
const c = b === undefined;
if (c) {
  $( "fail" );
}
$( "bad" );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
