# Preval test case

# default_no_no__obj_str.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Default no no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { ...y } } = { x: 'abc', b: 11, c: 12 };
$(y);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [];
const y /*:unknown*/ = objPatternRest(`abc`, tmpCalleeParam$1, undefined);
$(y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(objPatternRest(`abc`, [], undefined));
`````

## Pre Normal


`````js filename=intro
const {
  x: { ...y },
} = { x: `abc`, b: 11, c: 12 };
$(y);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: `abc`, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [];
const y = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = objPatternRest( "abc", a, undefined );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { 0: '"a"', 1: '"b"', 2: '"c"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
