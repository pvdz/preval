# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident new ident complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = new $($(1), $(2)))];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpCalleeParam$3 /*:unknown*/ = $(2);
const a /*:object*/ /*truthy*/ = new $(tmpCalleeParam$1, tmpCalleeParam$3);
$coerce(a, `string`);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
const a = new $(tmpCalleeParam$1, tmpCalleeParam$3);
$coerce(a, `string`);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = new $( a, b );
$coerce( c, "string" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpNewCallee = $;
let tmpCalleeParam$1 = $(1);
let tmpCalleeParam$3 = $(2);
a = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpCalleeParam = a;
tmpCompObj[tmpCalleeParam];
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
