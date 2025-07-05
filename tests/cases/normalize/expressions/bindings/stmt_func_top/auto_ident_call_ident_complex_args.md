# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident call ident complex args
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = $($(1), $(2));
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const a /*:unknown*/ = $(tmpCalleeParam, tmpCalleeParam$1);
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(1);
$($(tmpCalleeParam, $(2)));
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = $( a, b );
$( c );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = { $: $ };
  let tmpCalleeParam = $(1);
  let tmpCalleeParam$1 = $(2);
  let a = $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
  return undefined;
};
let tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) support ObjectExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
