# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident cond s-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  (10, 20, 30) ? $(2) : $($(100));
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
$(2);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$({ a: 999, b: 1000 });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
const a = {
  a: 999,
  b: 1000,
};
$( a );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
