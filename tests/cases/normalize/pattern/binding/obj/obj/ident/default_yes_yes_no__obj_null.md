# Preval test case

# default_yes_yes_no__obj_null.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default yes yes no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { y = $('fail') } = $({ y: 'fail2' }) } = { x: null, b: 11, c: 12 };
$('bad');
`````

## Settled


`````js filename=intro
null.y;
throw `[Preval]: Can not reach here`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
null.y;
throw `[Preval]: Can not reach here`;
`````

## Pre Normal


`````js filename=intro
const { x: { y: y = $(`fail`) } = $({ y: `fail2` }) } = { x: null, b: 11, c: 12 };
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: null, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { y: `fail2` };
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
let y = undefined;
const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  y = $(`fail`);
  $(`bad`);
} else {
  y = objPatternBeforeDefault$1;
  $(`bad`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
null.y;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
