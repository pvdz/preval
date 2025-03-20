# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident delete computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let arg = { y: 1 };

    let a = { a: 999, b: 1000 };
    delete arg[$("y")];
    $(a, arg);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ = { y: 1 };
delete arg[tmpDeleteCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
delete arg[tmpDeleteCompProp];
$({ a: 999, b: 1000 }, arg);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "y" );
const b = { y: 1 };
delete b[ a ];
const c = {
  a: 999,
  b: 1000,
};
$( c, b );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'y'
 - 2: { a: '999', b: '1000' }, {}
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
