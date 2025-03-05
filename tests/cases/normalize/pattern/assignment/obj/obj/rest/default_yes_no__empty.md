# Preval test case

# default_yes_no__empty.md

> Normalize > Pattern > Assignment > Obj > Obj > Rest > Default yes no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { ...y } = $({ a: 'fail' }) } = 1);
$('bad');
`````

## Pre Normal


`````js filename=intro
({ x: { ...y } = $({ a: `fail` }) } = 1);
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = 1;
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
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
y = objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(`bad`);
`````

## Output


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = (1).x;
let tmpCalleeParam$1 /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ = { a: `fail` };
  const tmpClusterSSA_objPatternAfterDefault /*:unknown*/ = $(tmpCalleeParam);
  tmpCalleeParam$1 = tmpClusterSSA_objPatternAfterDefault;
} else {
  tmpCalleeParam$1 = objPatternBeforeDefault;
}
const tmpCalleeParam$3 /*:array*/ = [];
y = objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 1.x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = { a: "fail" };
  const e = $( d );
  b = e;
}
else {
  b = a;
}
const f = [];
y = objPatternRest( b, f, undefined );
$( "bad" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - 1: { a: '"fail"' }
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
