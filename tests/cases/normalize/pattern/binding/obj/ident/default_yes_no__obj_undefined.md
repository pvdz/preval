# Preval test case

# default_yes_no__obj_undefined.md

> Normalize > Pattern > Binding > Obj > Ident > Default yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x = $('pass') } = { x: undefined };
$(x);
`````

## Pre Normal


`````js filename=intro
const { x: x = $(`pass`) } = { x: undefined };
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: undefined };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let x = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`pass`);
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(`pass`);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "pass" );
$( a );
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
