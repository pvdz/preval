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
const tmpBindingPatternArrRoot /*:unknown*/ = $(`pass2`);
const tmpArrPatternSplat /*:array*/ = [...tmpBindingPatternArrRoot];
const tmpAPBD /*:unknown*/ = tmpArrPatternSplat[0];
const tmpIfTest$1 /*:boolean*/ = tmpAPBD === undefined;
if (tmpIfTest$1) {
  const x /*:unknown*/ = $(`fail`);
  $(x);
} else {
  $(tmpAPBD);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = $(`pass2`);
const tmpAPBD = [...tmpBindingPatternArrRoot][0];
if (tmpAPBD === undefined) {
  $($(`fail`));
} else {
  $(tmpAPBD);
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


- (todo) Deal with array spreads in arr mutation?
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
