# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$([...(a = typeof x)]);
$(a, x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`n`, `u`, `m`, `b`, `e`, `r`];
$(tmpCalleeParam);
$(`number`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`n`, `u`, `m`, `b`, `e`, `r`]);
$(`number`, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "n", "u", "m", "b", "e", "r" ];
$( a );
$( "number", 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
a = typeof x;
const tmpArrSpread = a;
let tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
$(a, x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['n', 'u', 'm', 'b', 'e', 'r']
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
