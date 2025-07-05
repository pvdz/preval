# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Assignments > Return > Auto ident new ident complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return (a = new $($(1), $(2)));
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpClusterSSA_a /*:object*/ /*truthy*/ = new $(tmpCalleeParam, tmpCalleeParam$1);
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpClusterSSA_a = new $(tmpCalleeParam, tmpCalleeParam$1);
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = new $( a, b );
$( c );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpNewCallee = $;
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


- (todo) support Identifier as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: {}
 - 5: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
