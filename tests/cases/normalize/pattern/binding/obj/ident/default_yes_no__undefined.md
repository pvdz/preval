# Preval test case

# default_yes_no__undefined.md

> Normalize > Pattern > Binding > Obj > Ident > Default yes no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x = $('fail') } = undefined;
$('bad');
`````


## Settled


`````js filename=intro
undefined.x;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined.x;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
undefined.x;
throw "[Preval]: Can not reach here";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternObjRoot = undefined;
const tmpOPBD = tmpBindingPatternObjRoot.x;
let x = undefined;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  x = $(`fail`);
  $(`bad`);
} else {
  x = tmpOPBD;
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
