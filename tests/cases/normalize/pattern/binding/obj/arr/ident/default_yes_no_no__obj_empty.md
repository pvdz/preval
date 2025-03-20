# Preval test case

# default_yes_no_no__obj_empty.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default yes no no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [y = 'fail'] } = {};
$('bad');
`````


## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = $Object_prototype.x;
const arrPatternSplat /*:array*/ = [...objPatternNoDefault];
arrPatternSplat[0];
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = $Object_prototype.x;
[...objPatternNoDefault][0];
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
const b = [ ...a ];
b[ 0 ];
$( "bad" );
`````


## Todos triggered


- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
