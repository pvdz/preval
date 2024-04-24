# Preval test case

# default_yes_no__obj_missing.md

> Normalize > Pattern > Binding > Obj > Ident > Default yes no  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x = $('pass') } = { b: 2, c: 3 };
$(x);
`````

## Pre Normal

`````js filename=intro
const { x: x = $(`pass`) } = { b: 2, c: 3 };
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { b: 2, c: 3 };
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
const objPatternBeforeDefault = $ObjectPrototype.x;
let x = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`pass`);
  $(x);
} else {
  x = objPatternBeforeDefault;
  $(objPatternBeforeDefault);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ObjectPrototype.x;
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
