# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident new computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return (a = new (1, 2, b)[$("$")](1));
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`\$`);
const tmpCompObj /*:object*/ /*truthy*/ = { $: $ };
const tmpNewCallee /*:unknown*/ = tmpCompObj[tmpCalleeParam];
const tmpClusterSSA_a /*:object*/ /*truthy*/ = new tmpNewCallee(1);
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(`\$`);
const tmpNewCallee = { $: $ }[tmpCalleeParam];
const tmpClusterSSA_a = new tmpNewCallee(1);
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = new c( 1 );
$( d );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpCompObj = b;
  const tmpCalleeParam = $(`\$`);
  const tmpNewCallee = tmpCompObj[tmpCalleeParam];
  a = new tmpNewCallee(1);
  return a;
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a);
`````


## Todos triggered


- (todo) support Identifier as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: {}
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
