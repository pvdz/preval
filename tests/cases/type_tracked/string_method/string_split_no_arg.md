# Preval test case

# string_split_no_arg.md

> Type tracked > String method > String split no arg
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.split());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`hello world`];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`hello world`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "hello world" ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_split;
let tmpCalleeParam = [`hello world`];
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['hello world']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
