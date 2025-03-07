# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Binding > Obj > Arr > Rest > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [...y] } = 'abc';
$('bad');
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = `abc`.x;
const arrPatternSplat /*:array*/ = [...objPatternNoDefault];
arrPatternSplat.slice(0);
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = `abc`.x;
[...objPatternNoDefault].slice(0);
$(`bad`);
`````

## Pre Normal


`````js filename=intro
const {
  x: [...y],
} = `abc`;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = `abc`;
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat.slice(0);
$(`bad`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = "abc".x;
const b = [ ...a ];
b.slice( 0 );
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

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice