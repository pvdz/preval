# Preval test case

# default_yes_yes_no__obj_null.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes yes no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y = $('fail') } = $({ y: 'fail2' }) } = { x: null, b: 11, c: 12 });
$('bad');
`````

## Pre Normal


`````js filename=intro
({ x: { y: y = $(`fail`) } = $({ y: `fail2` }) } = { x: null, b: 11, c: 12 });
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = { x: null, b: 11, c: 12 };
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { y: `fail2` };
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  y = $(`fail`);
} else {
  y = objPatternBeforeDefault$1;
}
$(`bad`);
`````

## Output


`````js filename=intro
null.y;
throw `[Preval]: Can not reach here`;
`````

## PST Output

With rename=true

`````js filename=intro
null.y;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
