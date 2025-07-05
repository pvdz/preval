# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = 1,
    c = 2;

  let a = { a: 999, b: 1000 };
  a = b = 2;
  $(a, b, c);
}
$(f());
`````


## Settled


`````js filename=intro
$(2, 2, 2);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2, 2, 2);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2, 2, 2 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = 1;
  let c = 2;
  let a = { a: 999, b: 1000 };
  b = 2;
  a = 2;
  $(a, b, c);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2, 2, 2
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
