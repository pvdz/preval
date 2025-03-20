# Preval test case

# arr_obj.md

> Normalize > Pattern > Assignment > Base unique > Arr obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; }
([{ x }] = [{ x: 100 }]);
{ let x = 1; }
$(x);
`````


## Settled


`````js filename=intro
x = 100;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = 100;
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
x = 100;
$( x );
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
