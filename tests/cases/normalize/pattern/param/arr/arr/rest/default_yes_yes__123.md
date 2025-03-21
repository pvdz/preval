# Preval test case

# default_yes_yes__123.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default yes yes  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[...x] = $('fail')] = $('pass2')) {
  return x;
}
$(f(1, 2, 3, 200));
`````


## Settled


`````js filename=intro
[...1];
throw `[Preval]: Array spread must crash before this line`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
[...1];
throw `[Preval]: Array spread must crash before this line`;
`````


## PST Settled
With rename=true

`````js filename=intro
[ ...1 ];
throw "[Preval]: Array spread must crash before this line";
`````


## Todos triggered


- (todo) inline computed array property read
- (todo) replace with $array_slice
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) type trackeed tricks can possibly support method $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
