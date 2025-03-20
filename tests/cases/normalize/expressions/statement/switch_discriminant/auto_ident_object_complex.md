# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ({ x: $(1), y: 2, z: $(3) }) {
  default:
    $(100);
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
$(3);
$(100);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(3);
$(100);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 3 );
$( 100 );
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
 - 1: 1
 - 2: 3
 - 3: 100
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
