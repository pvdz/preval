# Preval test case

# auto_ident_new_computed_simple_simple.md

> Normalize > Expressions > Statement > Ternary a > Auto ident new computed simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new b["$"](1) ? $(100) : $(200);
$(a);
`````


## Settled


`````js filename=intro
new $(1);
$(100);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
new $(1);
$(100);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
new $( 1 );
$( 100 );
const a = {
  a: 999,
  b: 1000,
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = b.$;
const tmpIfTest = new tmpNewCallee(1);
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  $(200);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
