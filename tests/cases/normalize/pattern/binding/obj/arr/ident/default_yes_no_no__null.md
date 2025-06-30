# Preval test case

# default_yes_no_no__null.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default yes no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [y = 'fail'] } = null;
$('bad');
`````


## Settled


`````js filename=intro
null.x;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
null.x;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
null.x;
throw "[Preval]: Can not reach here";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternObjRoot = null;
const tmpOPND = tmpBindingPatternObjRoot.x;
const tmpArrPatternSplat = [...tmpOPND];
const tmpAPBD = tmpArrPatternSplat[0];
let y = undefined;
const tmpIfTest = tmpAPBD === undefined;
if (tmpIfTest) {
  y = `fail`;
  $(`bad`);
} else {
  y = tmpAPBD;
  $(`bad`);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) property on nullable; unreachable or hard error?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
