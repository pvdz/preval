# Preval test case

# default_yes_yes_no__obj_null.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes yes no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('fail') } = $({ y: 'fail2' }) } = { x: null, b: 11, c: 12 });
$('bad');
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
const tmpAssignObjPatternRhs = { x: null, b: 11, c: 12 };
const tmpOPBD = tmpAssignObjPatternRhs.x;
let tmpOPAD = undefined;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  let tmpCalleeParam = { y: `fail2` };
  tmpOPAD = $(tmpCalleeParam);
} else {
  tmpOPAD = tmpOPBD;
}
const tmpOPBD$1 = tmpOPAD.y;
const tmpIfTest$1 = tmpOPBD$1 === undefined;
if (tmpIfTest$1) {
  y = $(`fail`);
  $(`bad`);
} else {
  y = tmpOPBD$1;
  $(`bad`);
}
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
