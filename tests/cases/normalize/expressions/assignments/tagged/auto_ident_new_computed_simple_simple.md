# Preval test case

# auto_ident_new_computed_simple_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident new computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${(a = new b["$"](1))} after`;
$(a);
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = new $(1);
const tmpCalleeParam /*:array*/ /*truthy*/ = [`before `, ` after`];
$(tmpCalleeParam, a);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = new $(1);
$([`before `, ` after`], a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
const b = [ "before ", " after" ];
$( b, a );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
const tmpNewCallee = b.$;
a = new tmpNewCallee(1);
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], {}
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
