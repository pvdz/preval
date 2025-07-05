# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Return > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = ($(1), $(2), $(x)));
}
$(f());
$(a, x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpClusterSSA_a /*:unknown*/ = $(1);
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpClusterSSA_a = $(1);
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 1 );
$( a );
$( a, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(1);
  $(2);
  a = $(x);
  return a;
};
let x = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, x);
`````


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 1
 - 5: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
