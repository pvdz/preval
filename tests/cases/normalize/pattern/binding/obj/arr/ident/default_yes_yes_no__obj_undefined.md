# Preval test case

# default_yes_yes_no__obj_undefined.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default yes yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [y = 'fail'] = $(['pass2']) } = { x: undefined, a: 11, b: 12 };
$('bad');
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`pass2`];
const objPatternAfterDefault /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...objPatternAfterDefault];
arrPatternSplat[0];
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternAfterDefault = $([`pass2`]);
[...objPatternAfterDefault][0];
$(`bad`);
`````

## Pre Normal


`````js filename=intro
const { x: [y = `fail`] = $([`pass2`]) } = { x: undefined, a: 11, b: 12 };
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: undefined, a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = [`pass2`];
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
let y = undefined;
const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  y = `fail`;
  $(`bad`);
} else {
  y = arrPatternBeforeDefault;
  $(`bad`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "pass2" ];
const b = $( a );
const c = [ ...b ];
c[ 0 ];
$( "bad" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['pass2']
 - 2: 'bad'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope