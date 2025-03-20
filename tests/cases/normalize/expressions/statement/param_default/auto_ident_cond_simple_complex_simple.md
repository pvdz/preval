# Preval test case

# auto_ident_cond_simple_complex_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident cond simple complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = 1 ? $(2) : $($(100))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
$(2);
$(undefined);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(undefined);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( undefined );
const a = {
  a: 999,
  b: 1000,
};
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: undefined
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
