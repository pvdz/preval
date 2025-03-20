# Preval test case

# default_yes_no__arr_123.md

> Normalize > Pattern > Assignment > Arr > Ident > Default yes no  arr 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([x = $('fail')] = [1, 2, 3]);
$(x);
`````


## Settled


`````js filename=intro
x = 1;
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = 1;
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
x = 1;
$( 1 );
`````


## Todos triggered


- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
