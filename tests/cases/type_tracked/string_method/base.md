# Preval test case

# base.md

> Type tracked > String method > Base
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.replace(/ /g, ', '));
`````


## Settled


`````js filename=intro
$(`hello, world`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`hello, world`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "hello, world" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_replace;
const tmpMCP = new $regex_constructor(` `, `g`);
let tmpCalleeParam = $dotCall(tmpMCF, `hello world`, `replace`, tmpMCP, `, `);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello, world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
