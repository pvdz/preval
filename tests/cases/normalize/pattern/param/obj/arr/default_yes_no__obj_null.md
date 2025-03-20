# Preval test case

# default_yes_no__obj_null.md

> Normalize > Pattern > Param > Obj > Arr > Default yes no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) }) {
  return 'bad';
}
$(f({ x: null, a: 11, b: 12 }, 10));
`````


## Settled


`````js filename=intro
[...null];
throw `[Preval]: Array spread must crash before this line`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
[...null];
throw `[Preval]: Array spread must crash before this line`;
`````


## PST Settled
With rename=true

`````js filename=intro
[ ...null ];
throw "[Preval]: Array spread must crash before this line";
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
