# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Stmt global block > Auto ident delete computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
{
  let arg = { y: 1 };

  let a = { a: 999, b: 1000 };
  delete ($(1), $(2), arg)[$("y")];
  $(a, arg);
}
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ = { y: 1 };
delete arg[tmpDeleteCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
delete arg[tmpDeleteCompProp];
$({ a: 999, b: 1000 }, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( "y" );
const b = { y: 1 };
delete b[ a ];
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
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
