# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Statement > Return > Auto ident call complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return $($)($(1), $(2));
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpReturnArg /*:unknown*/ = tmpCallComplexCallee(tmpCalleeParam, tmpCalleeParam$1);
$(tmpReturnArg);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallComplexCallee = $($);
const tmpCalleeParam = $(1);
$(tmpCallComplexCallee(tmpCalleeParam, $(2)));
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
const d = a( b, c );
$( d );
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpCallComplexCallee = $($);
  const tmpCallCallee = tmpCallComplexCallee;
  let tmpCalleeParam = $(1);
  let tmpCalleeParam$1 = $(2);
  const tmpReturnArg = tmpCallComplexCallee(tmpCalleeParam, tmpCalleeParam$1);
  return tmpReturnArg;
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
