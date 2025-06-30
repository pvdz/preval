# Preval test case

# default_yes_no_no__arr_null.md

> Normalize > Pattern > Binding > Arr > Obj > Ident > Default yes no no  arr null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{ x = $('pass') }] = [null, 20, 30];
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
const tmpBindingPatternArrRoot = [null, 20, 30];
const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
const tmpArrPatternStep = tmpArrPatternSplat[0];
const tmpOPBD = tmpArrPatternStep.x;
let x = undefined;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  x = $(`pass`);
  $(`bad`);
} else {
  x = tmpOPBD;
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
