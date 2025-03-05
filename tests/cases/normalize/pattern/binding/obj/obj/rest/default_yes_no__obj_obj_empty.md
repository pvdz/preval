# Preval test case

# default_yes_no__obj_obj_empty.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Default yes no  obj obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { ...y } = $({ a: 'fail' }) } = { x: {}, b: 11, c: 12 };
$(y);
`````

## Pre Normal


`````js filename=intro
const { x: { ...y } = $({ a: `fail` }) } = { x: {}, b: 11, c: 12 };
$(y);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = {};
const bindingPatternObjRoot = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { a: `fail` };
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const tmpCalleeParam$1 = objPatternAfterDefault;
const tmpCalleeParam$3 = [];
const y = objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(y);
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:object*/ = {};
const tmpCalleeParam$3 /*:array*/ = [];
const y /*:unknown*/ = objPatternRest(tmpObjLitVal, tmpCalleeParam$3, undefined);
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = [];
const c = objPatternRest( a, b, undefined );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
