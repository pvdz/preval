# Preval test case

# default_no_no_no__arr_0.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default no no no  arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[x]]) {
  return 'bad';
}
$(f([0, 4, 5], 200));
`````


## Settled


`````js filename=intro
[...0];
throw `[Preval]: Array spread must crash before this line`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
[...0];
throw `[Preval]: Array spread must crash before this line`;
`````


## PST Settled
With rename=true

`````js filename=intro
[ ...0 ];
throw "[Preval]: Array spread must crash before this line";
`````


## Todos triggered


- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
