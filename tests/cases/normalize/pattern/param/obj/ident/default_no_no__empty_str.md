# Preval test case

# default_no_no__empty_str.md

> Normalize > Pattern > Param > Obj > Ident > Default no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x }) {
  return x;
}
$(f('', 10));
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $String_prototype.x;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($String_prototype.x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $String_prototype.x;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let x = tmpBindingPatternObjRoot.x;
  return x;
};
let tmpCalleeParam = f(``, 10);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
