# Preval test case

# default_no_no__missing.md

> Normalize > Pattern > Param > Obj > Arr > Rest > Default no no  missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [...y] }) {
  return 'bad';
}
$(f({ a: 11, b: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $Object_prototype.x;
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpOPND];
$dotCall($array_slice, tmpArrPatternSplat, `slice`, 0);
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPND = $Object_prototype.x;
$dotCall($array_slice, [...tmpOPND], `slice`, 0);
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
const b = [ ...a ];
$dotCall( $array_slice, b, "slice", 0 );
$( "bad" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpOPND = tmpBindingPatternObjRoot.x;
  let tmpArrPatternSplat = [...tmpOPND];
  const tmpMCF = tmpArrPatternSplat.slice;
  let y = $dotCall(tmpMCF, tmpArrPatternSplat, `slice`, 0);
  return `bad`;
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = { a: 11, b: 12 };
let tmpCalleeParam = f(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
