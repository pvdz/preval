# Preval test case

# throw_between.md

> Let aliases > Ai > Throw between
>
> Throw statement between aliases (should not alias, code after throw is unreachable)

## Input

`````js filename=intro
let x = $("val");
const a = x;
throw new Error("stop");
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
$(`val`);
const tmpThrowArg /*:object*/ /*truthy*/ = new $error_constructor(`stop`);
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`val`);
const tmpThrowArg = new $error_constructor(`stop`);
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "val" );
const a = new $error_constructor( "stop" );
throw a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
const tmpThrowArg = new $error_constructor(`stop`);
throw tmpThrowArg;
const b = 0;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - eval returned: ('<crash[ stop ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
