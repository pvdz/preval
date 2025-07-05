# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident cond simple s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = 1 ? (40, 50, 60) : $($(100));
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
$(60);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(60);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 60 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  a = 60;
  $(a);
  return undefined;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 60
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
