# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Statement > Return > Auto ident new ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return new $($(1), $(2));
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpReturnArg /*:object*/ /*truthy*/ = new $(tmpCalleeParam, tmpCalleeParam$1);
$(tmpReturnArg);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
$(new $(tmpCalleeParam, tmpCalleeParam$1));
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = new $( a, b );
$( c );
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpNewCallee = $;
  let tmpCalleeParam = $(1);
  let tmpCalleeParam$1 = $(2);
  const tmpReturnArg = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
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
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: {}
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
