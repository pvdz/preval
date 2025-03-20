# Preval test case

# default_no_no_no__obj_undefined.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default no no no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [y] }) {
  return 'bad';
}
$(f({ x: undefined, a: 11, b: 12 }, 10));
`````


## Settled


`````js filename=intro
[...undefined];
throw `[Preval]: Array spread must crash before this line`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
[...undefined];
throw `[Preval]: Array spread must crash before this line`;
`````


## PST Settled
With rename=true

`````js filename=intro
[ ...undefined ];
throw "[Preval]: Array spread must crash before this line";
`````


## Todos triggered


- inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
