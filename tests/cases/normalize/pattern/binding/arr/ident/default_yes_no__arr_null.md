# Preval test case

# default_yes_no__arr_null.md

> Normalize > Pattern > Binding > Arr > Ident > Default yes no  arr null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [x = $('pass')] = [null, 201];
$(x);
`````


## Settled


`````js filename=intro
$(null);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(null);
`````


## PST Settled
With rename=true

`````js filename=intro
$( null );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternArrRoot = [null, 201];
const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
const tmpAPBD = tmpArrPatternSplat[0];
let x = undefined;
const tmpIfTest = tmpAPBD === undefined;
if (tmpIfTest) {
  x = $(`pass`);
  $(x);
} else {
  x = tmpAPBD;
  $(tmpAPBD);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
