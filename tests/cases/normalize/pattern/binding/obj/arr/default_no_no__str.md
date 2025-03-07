# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Binding > Obj > Arr > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [] } = 'abc';
$('bad');
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = `abc`.x;
[...objPatternNoDefault];
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = `abc`.x;
[...objPatternNoDefault];
$(`bad`);
`````

## Pre Normal


`````js filename=intro
const {
  x: [],
} = `abc`;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = `abc`;
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
$(`bad`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = "abc".x;
[ ...a ];
$( "bad" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: BAD!?
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Post settled calls: BAD!!
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Denormalized calls: BAD!!
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')
