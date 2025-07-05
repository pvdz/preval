# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident c-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let x = 1;

    let a = ($(1), $(2), $(x));
    $(a, x);
  }
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
$(2);
const a /*:unknown*/ = $(1);
$(a, 1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$($(1), 1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 1 );
$( a, 1 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  $(1);
  $(2);
  let a = $(x);
  $(a, x);
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
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 1, 1
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
