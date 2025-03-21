# Preval test case

# undefined_prop_reg.md

> Normalize > Static expressions > Statement > Undefined prop reg
>
> Property on undefined should cause the remainder to be DCE

## Input

`````js filename=intro
$(undefined.foo);
$('fail, DCE me');
`````


## Settled


`````js filename=intro
undefined.foo;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined.foo;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
undefined.foo;
throw "[Preval]: Can not reach here";
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
