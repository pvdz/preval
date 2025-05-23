# Preval test case

# default_yes_yes_no__arr_str.md

> Normalize > Pattern > Assignment > Arr > Arr > Ident > Default yes yes no  arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[x = $('fail')] = $(['fail2'])] = ['abc', 4, 5]);
$(x);
`````


## Settled


`````js filename=intro
x = `a`;
$(`a`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = `a`;
$(`a`);
`````


## PST Settled
With rename=true

`````js filename=intro
x = "a";
$( "a" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrAssignPatternRhs = [`abc`, 4, 5];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
const tmpAPBD = tmpArrPatternSplat[0];
let tmpArrPatternStep = undefined;
const tmpIfTest = tmpAPBD === undefined;
if (tmpIfTest) {
  let tmpCalleeParam = [`fail2`];
  tmpArrPatternStep = $(tmpCalleeParam);
} else {
  tmpArrPatternStep = tmpAPBD;
}
const tmpArrPatternSplat$1 = [...tmpArrPatternStep];
const tmpAPBD$1 = tmpArrPatternSplat$1[0];
const tmpIfTest$1 = tmpAPBD$1 === undefined;
if (tmpIfTest$1) {
  x = $(`fail`);
  $(x);
} else {
  x = tmpAPBD$1;
  $(tmpAPBD$1);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
