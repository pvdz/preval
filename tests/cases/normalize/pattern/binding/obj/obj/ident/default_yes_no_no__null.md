# Preval test case

# default_yes_no_no__null.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default yes no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { y = $('fail') } } = null;
$('bad');
`````

## Settled


`````js filename=intro
null.x;
throw `[Preval]: Can not reach here`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
null.x;
throw `[Preval]: Can not reach here`;
`````

## Pre Normal


`````js filename=intro
const {
  x: { y: y = $(`fail`) },
} = null;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = null;
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
let y = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $(`fail`);
  $(`bad`);
} else {
  y = objPatternBeforeDefault;
  $(`bad`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
null.x;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
