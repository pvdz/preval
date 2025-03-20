# Preval test case

# auto_ident_cond_simple_complex_simple.md

> Normalize > Expressions > Statement > Return > Auto ident cond simple complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return 1 ? $(2) : $($(100));
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpReturnArg /*:unknown*/ = $(2);
$(tmpReturnArg);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(2));
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a );
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
