# Preval test case

# default_yes_no_no__obj_null.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes no no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { y = $('fail') } }) {
  return 'bad';
}
$(f({ x: null, b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
null.y;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
null.y;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
null.y;
throw "[Preval]: Can not reach here";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpOPND = tmpBindingPatternObjRoot.x;
  let tmpOPBD = tmpOPND.y;
  let y = undefined;
  const tmpIfTest = tmpOPBD === undefined;
  if (tmpIfTest) {
    y = $(`fail`);
    return `bad`;
  } else {
    y = tmpOPBD;
    return `bad`;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = { x: null, b: 11, c: 12 };
let tmpCalleeParam = f(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) property on nullable; unreachable or hard error?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
