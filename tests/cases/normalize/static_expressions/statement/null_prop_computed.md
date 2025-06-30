# Preval test case

# null_prop_computed.md

> Normalize > Static expressions > Statement > Null prop computed
>
> Property on null should cause the remainder to be DCE

The computed value is not DCE but the actual usage should be removed because it doesn't matter what property attempts the access.

## Input

`````js filename=intro
$(null[$('keep me')]);
$('fail, DCE me');
`````


## Settled


`````js filename=intro
$(`keep me`);
null.eliminatedComputedProp;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`keep me`);
null.eliminatedComputedProp;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "keep me" );
null.eliminatedComputedProp;
throw "[Preval]: Can not reach here";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`keep me`);
let tmpCalleeParam = null.eliminatedComputedProp;
throw `[Preval]: Can not reach here`;
`````


## Todos triggered


- (todo) property on nullable; unreachable or hard error?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'keep me'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
