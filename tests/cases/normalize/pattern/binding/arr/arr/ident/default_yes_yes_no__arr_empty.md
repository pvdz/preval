# Preval test case

# default_yes_yes_no__arr_empty.md

> Normalize > Pattern > Binding > Arr > Arr > Ident > Default yes yes no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[x = $('fail')] = $(['pass2'])] = [];
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`pass2`];
const arrPatternStep /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat$1 /*:array*/ = [...arrPatternStep];
const arrPatternBeforeDefault$1 /*:unknown*/ = arrPatternSplat$1[0];
const tmpIfTest$1 /*:boolean*/ = arrPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  const tmpClusterSSA_x /*:unknown*/ = $(`fail`);
  $(tmpClusterSSA_x);
} else {
  $(arrPatternBeforeDefault$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arrPatternStep = $([`pass2`]);
const arrPatternBeforeDefault$1 = [...arrPatternStep][0];
if (arrPatternBeforeDefault$1 === undefined) {
  $($(`fail`));
} else {
  $(arrPatternBeforeDefault$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "pass2" ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
const e = d === undefined;
if (e) {
  const f = $( "fail" );
  $( f );
}
else {
  $( d );
}
`````


## Todos triggered


- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['pass2']
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
