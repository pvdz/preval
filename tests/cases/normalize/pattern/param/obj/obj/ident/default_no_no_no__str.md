# Preval test case

# default_no_no_no__str.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default no no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { y } }) {
  return 'bad';
}
$(f('abc', 10));
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $String_prototype.x;
tmpOPND.y;
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$String_prototype.x.y;
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $String_prototype.x;
a.y;
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
  let y = tmpOPND.y;
  return `bad`;
};
let tmpCalleeParam = f(`abc`, 10);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support Identifier as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
