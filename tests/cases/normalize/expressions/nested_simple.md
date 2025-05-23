# Preval test case

# nested_simple.md

> Normalize > Expressions > Nested simple
>
> Nested assignments should be split up

## Input

`````js filename=intro
var a = 10, b = 20, c = 30;
$(a = b = c);
`````


## Settled


`````js filename=intro
$(30);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(30);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 30 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
a = 10;
b = 20;
c = 30;
b = c;
a = c;
let tmpCalleeParam = a;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
