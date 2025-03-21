# Preval test case

# default_yes_no__str.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default yes no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[...x] = $('pass')]) {
  return x;
}
$(f('abc', 200));
`````


## Settled


`````js filename=intro
const x /*:array*/ = [`a`];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`a`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a" ];
$( a );
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
 - 1: ['a']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
