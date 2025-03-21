# Preval test case

# nested_simple2.md

> Normalize > Expressions > Nested simple2
>
> Nested assignments should be split up

## Input

`````js filename=intro
        let a = undefined;
        let c = undefined;
        let tmpSSA_a = 10;
        let tmpSSA_c = 30;
        tmpSSA_c;
        let tmpSSA_a$1 = c;
        const tmpCalleeParam = tmpSSA_a$1;
        $(tmpCalleeParam);

`````


## Settled


`````js filename=intro
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
