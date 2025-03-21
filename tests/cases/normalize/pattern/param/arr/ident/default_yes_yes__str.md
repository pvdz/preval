# Preval test case

# default_yes_yes__str.md

> Normalize > Pattern > Param > Arr > Ident > Default yes yes  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([x = $('fail')] = $('fail2')) {
  return x;
}
$(f('xyz', 200));
`````


## Settled


`````js filename=intro
$(`x`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`x`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "x" );
`````


## Todos triggered


- (todo) inline computed array property read
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
