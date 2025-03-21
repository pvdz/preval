# Preval test case

# default_yes_yes__undefined.md

> Normalize > Pattern > Param > Arr > Ident > Default yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([x = $('fail')] = $('pass2')) {
  return x;
}
$(f(undefined, 200));
`````


## Settled


`````js filename=intro
const bindingPatternArrRoot /*:unknown*/ = $(`pass2`);
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const arrPatternBeforeDefault /*:unknown*/ = arrPatternSplat[0];
const tmpIfTest$1 /*:boolean*/ = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpClusterSSA_x /*:unknown*/ = $(`fail`);
  $(tmpClusterSSA_x);
} else {
  $(arrPatternBeforeDefault);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = $(`pass2`);
const arrPatternBeforeDefault = [...bindingPatternArrRoot][0];
if (arrPatternBeforeDefault === undefined) {
  $($(`fail`));
} else {
  $(arrPatternBeforeDefault);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass2" );
const b = [ ...a ];
const c = b[ 0 ];
const d = c === undefined;
if (d) {
  const e = $( "fail" );
  $( e );
}
else {
  $( c );
}
`````


## Todos triggered


- (todo) inline computed array property read
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass2'
 - 2: 'p'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
