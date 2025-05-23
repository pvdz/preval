# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Assignments > Tagged > Auto ident new ident complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${(a = new $($(1), $(2)))} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(1);
const tmpCalleeParam$5 /*:unknown*/ = $(2);
const a /*:object*/ = new $(tmpCalleeParam$3, tmpCalleeParam$5);
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, a);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
const a = new $(tmpCalleeParam$3, tmpCalleeParam$5);
$([`before `, ` after`], a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = new $( a, b );
const d = [ "before ", " after" ];
$( d, c );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
const tmpNewCallee = $;
let tmpCalleeParam$3 = $(1);
let tmpCalleeParam$5 = $(2);
a = new tmpNewCallee(tmpCalleeParam$3, tmpCalleeParam$5);
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
 - 2: 2
 - 3: 1, 2
 - 4: ['before ', ' after'], {}
 - 5: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
