# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident new computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new (1, 2, b)[$("$")](1)) && (a = new (1, 2, b)[$("$")](1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpNewCallee /*:unknown*/ = b[tmpCalleeParam$1];
new tmpNewCallee(1);
const tmpCalleeParam$3 /*:unknown*/ = $(`\$`);
const tmpNewCallee$1 /*:unknown*/ = b[tmpCalleeParam$3];
const tmpNestedComplexRhs /*:object*/ = new tmpNewCallee$1(1);
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $(`\$`);
const b = { $: $ };
const tmpNewCallee = b[tmpCalleeParam$1];
new tmpNewCallee(1);
const tmpCalleeParam$3 = $(`\$`);
const tmpNewCallee$1 = b[tmpCalleeParam$3];
const tmpNestedComplexRhs = new tmpNewCallee$1(1);
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
new c( 1 );
const d = $( "$" );
const e = b[ d ];
const f = new e( 1 );
$( f );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCalleeParam$1 = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCalleeParam$1];
a = new tmpNewCallee(1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpCompObj$1 = b;
  const tmpCalleeParam$3 = $(`\$`);
  const tmpNewCallee$1 = tmpCompObj$1[tmpCalleeParam$3];
  const tmpNestedComplexRhs = new tmpNewCallee$1(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: '$'
 - 4: 1
 - 5: {}
 - 6: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
