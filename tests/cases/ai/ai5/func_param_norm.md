# Preval test case

# func_param_norm.md

> Ai > Ai5 > Func param norm
>
> Test function parameter normalization

## Input

`````js filename=intro
function foo(a, b) {
    $(a);  // Track first param
    $(b);  // Track second param
    return a + b;
}

const result = foo($(1), $(2));
$(result);

// Expected:
// function foo($$0, $$1) {
//     const a = $$0;
//     const b = $$1;
//     debugger;
//     $(a);
//     $(b);
//     return a + b;
// }
// const result = foo($(1), $(2));
// $(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
$(tmpCalleeParam);
$(tmpCalleeParam$1);
const tmpReturnArg /*:primitive*/ = tmpCalleeParam + tmpCalleeParam$1;
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
$(tmpCalleeParam);
$(tmpCalleeParam$1);
$(tmpCalleeParam + tmpCalleeParam$1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
$( a );
$( b );
const c = a + b;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let foo = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  $(a);
  $(b);
  const tmpReturnArg = a + b;
  return tmpReturnArg;
};
const tmpCallCallee = foo;
let tmpCalleeParam = $(1);
let tmpCalleeParam$1 = $(2);
const result = foo(tmpCalleeParam, tmpCalleeParam$1);
$(result);
`````


## Todos triggered


- (todo) support Identifier as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
