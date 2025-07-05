# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > Return > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return (a = new ($($))($(1), $(2)));
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpClusterSSA_a /*:object*/ /*truthy*/ = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpClusterSSA_a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
const d = new a( b, c );
$( d );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpNewCallee = $($);
  let tmpCalleeParam = $(1);
  let tmpCalleeParam$1 = $(2);
  a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  return a;
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
$(a);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: {}
 - 6: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
