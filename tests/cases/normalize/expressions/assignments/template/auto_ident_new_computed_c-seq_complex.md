# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Template > Auto ident new computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(`before  ${(a = new (1, 2, $(b))[$("$")](1))}  after`);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam$3 /*:unknown*/ = $(`\$`);
const tmpNewCallee /*:unknown*/ = tmpCompObj[tmpCalleeParam$3];
const a /*:object*/ /*truthy*/ = new tmpNewCallee(1);
const tmpBinBothRhs /*:string*/ = $coerce(a, `string`);
const tmpCalleeParam /*:string*/ /*truthy*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompObj = $({ $: $ });
const tmpCalleeParam$3 = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCalleeParam$3];
const a = new tmpNewCallee(1);
$(`before  ${a}  after`);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ];
const e = new d( 1 );
const f = $coerce( e, "string" );
const g = `before  ${f}  after`;
$( g );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpCompObj = $(b);
const tmpCalleeParam$3 = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCalleeParam$3];
a = new tmpNewCallee(1);
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 'before [object Object] after'
 - 5: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
