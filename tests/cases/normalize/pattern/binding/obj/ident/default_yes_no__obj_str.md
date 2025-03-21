# Preval test case

# default_yes_no__obj_str.md

> Normalize > Pattern > Binding > Obj > Ident > Default yes no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x = $('fail') } = { x: 'abc' };
$(x);
`````

## Settled


`````js filename=intro
$(`abc`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abc`);
`````

## Pre Normal


`````js filename=intro
const { x: x = $(`fail`) } = { x: `abc` };
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: `abc` };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let x = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`fail`);
  $(x);
} else {
  x = objPatternBeforeDefault;
  $(objPatternBeforeDefault);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( "abc" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
