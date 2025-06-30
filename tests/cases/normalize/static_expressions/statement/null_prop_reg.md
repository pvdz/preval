# Preval test case

# null_prop_reg.md

> Normalize > Static expressions > Statement > Null prop reg
>
> Property on null should cause the remainder to be DCE

## Input

`````js filename=intro
$(null.foo);
$('fail, DCE me');
`````


## Settled


`````js filename=intro
null.foo;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
null.foo;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
null.foo;
throw "[Preval]: Can not reach here";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = null.foo;
throw `[Preval]: Can not reach here`;
`````


## Todos triggered


- (todo) property on nullable; unreachable or hard error?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
