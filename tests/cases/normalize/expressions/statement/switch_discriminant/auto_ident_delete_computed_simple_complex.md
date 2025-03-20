# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident delete computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch (delete arg[$("y")]) {
  default:
    $(100);
}
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ = { y: 1 };
delete arg[tmpDeleteCompProp];
$(100);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
delete arg[tmpDeleteCompProp];
$(100);
$({ a: 999, b: 1000 }, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "y" );
const b = { y: 1 };
delete b[ a ];
$( 100 );
const c = {
  a: 999,
  b: 1000,
};
$( c, b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'y'
 - 2: 100
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
