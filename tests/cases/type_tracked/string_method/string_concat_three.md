# Preval test case

# string_concat_three.md

> Type tracked > String method > String concat three
>
> String concat should fully resolve

## Input

`````js filename=intro
$('hello'.concat(',', ' ', 'world'));
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
const tmpMCF = $string_concat;
let tmpCalleeParam = $dotCall($string_concat, `hello`, `concat`, `,`, ` `, `world`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) find test case where template ends up with multiple expressions


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
