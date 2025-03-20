# Preval test case

# default_no_no_no__str.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default no no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [y] }) {
  return 'bad';
}
$(f('abc', 10));
`````


## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = `abc`.x;
const arrPatternSplat /*:array*/ = [...objPatternNoDefault];
arrPatternSplat[0];
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = `abc`.x;
[...objPatternNoDefault][0];
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = "abc".x;
const b = [ ...a ];
b[ 0 ];
$( "bad" );
`````


## Todos triggered


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
