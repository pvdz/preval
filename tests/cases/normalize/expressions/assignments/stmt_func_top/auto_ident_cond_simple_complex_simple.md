# Preval test case

# auto_ident_cond_simple_complex_simple.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident cond simple complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = 1 ? $(2) : $($(100));
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(2);
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(2));
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  a = $(2);
  $(a);
  return undefined;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
