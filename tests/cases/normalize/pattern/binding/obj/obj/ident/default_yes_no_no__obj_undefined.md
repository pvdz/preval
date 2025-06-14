# Preval test case

# default_yes_no_no__obj_undefined.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default yes no no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { y = $('fail') } } = { x: undefined, b: 11, c: 12 };
$('bad');
`````


## Settled


`````js filename=intro
undefined.y;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined.y;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
undefined.y;
throw "[Preval]: Can not reach here";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternObjRoot = { x: undefined, b: 11, c: 12 };
const tmpOPND = tmpBindingPatternObjRoot.x;
const tmpOPBD = tmpOPND.y;
let y = undefined;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  y = $(`fail`);
  $(`bad`);
} else {
  y = tmpOPBD;
  $(`bad`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
