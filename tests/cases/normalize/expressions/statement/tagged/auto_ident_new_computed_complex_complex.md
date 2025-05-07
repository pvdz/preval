# Preval test case

# auto_ident_new_computed_complex_complex.md

> Normalize > Expressions > Statement > Tagged > Auto ident new computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${new ($(b)[$("$")])(1)} after`;
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam$3 /*:unknown*/ = $(`\$`);
const tmpNewCallee /*:unknown*/ = tmpCompObj[tmpCalleeParam$3];
const tmpCalleeParam$1 /*:object*/ = new tmpNewCallee(1);
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, tmpCalleeParam$1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompObj = $({ $: $ });
const tmpCalleeParam$3 = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCalleeParam$3];
const tmpCalleeParam$1 = new tmpNewCallee(1);
$([`before `, ` after`], tmpCalleeParam$1);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ];
const e = new d( 1 );
const f = [ "before ", " after" ];
$( f, e );
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: ['before ', ' after'], {}
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
