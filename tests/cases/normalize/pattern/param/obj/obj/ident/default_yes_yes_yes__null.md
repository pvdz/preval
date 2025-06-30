# Preval test case

# default_yes_yes_yes__null.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes yes  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'fail2' }) } = $({ x: { y: 'fail3' } })) {
  return 'bad';
}
$(f(null, 10));
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
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = { y: `fail3` };
    let tmpCalleeParam = { x: tmpObjLitVal };
    tmpBindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    tmpBindingPatternObjRoot = tmpParamBare;
  }
  let tmpOPBD = tmpBindingPatternObjRoot.x;
  let tmpOPAD = undefined;
  const tmpIfTest$1 = tmpOPBD === undefined;
  if (tmpIfTest$1) {
    let tmpCalleeParam$1 = { y: `fail2` };
    tmpOPAD = $(tmpCalleeParam$1);
  } else {
    tmpOPAD = tmpOPBD;
  }
  let tmpOPBD$1 = tmpOPAD.y;
  let y = undefined;
  const tmpIfTest$3 = tmpOPBD$1 === undefined;
  if (tmpIfTest$3) {
    y = $(`fail`);
    return `bad`;
  } else {
    y = tmpOPBD$1;
    return `bad`;
  }
};
let tmpCalleeParam$3 = f(null, 10);
$(tmpCalleeParam$3);
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
