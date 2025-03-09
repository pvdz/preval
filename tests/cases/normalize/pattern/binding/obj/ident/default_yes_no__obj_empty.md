# Preval test case

# default_yes_no__obj_empty.md

> Normalize > Pattern > Binding > Obj > Ident > Default yes no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x = $('pass') } = {};
$(x);
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = $Object_prototype.x;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpClusterSSA_x /*:unknown*/ = $(`pass`);
  $(tmpClusterSSA_x);
} else {
  $(objPatternBeforeDefault);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = $Object_prototype.x;
if (objPatternBeforeDefault === undefined) {
  $($(`pass`));
} else {
  $(objPatternBeforeDefault);
}
`````

## Pre Normal


`````js filename=intro
const { x: x = $(`pass`) } = {};
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = {};
const objPatternBeforeDefault = bindingPatternObjRoot.x;
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

## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
const b = a === undefined;
if (b) {
  const c = $( "pass" );
  $( c );
}
else {
  $( a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
