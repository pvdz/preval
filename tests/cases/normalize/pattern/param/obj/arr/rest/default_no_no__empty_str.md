# Preval test case

# default_no_no__empty_str.md

> Normalize > Pattern > Param > Obj > Arr > Rest > Default no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [...y] }) {
  return 'bad';
}
$(f('', 10));
`````


## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = ``.x;
const arrPatternSplat /*:array*/ = [...objPatternNoDefault];
arrPatternSplat.slice(0);
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = ``.x;
[...objPatternNoDefault].slice(0);
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = "".x;
const b = [ ...a ];
b.slice( 0 );
$( "bad" );
`````


## Todos triggered


- replace with $array_slice
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
