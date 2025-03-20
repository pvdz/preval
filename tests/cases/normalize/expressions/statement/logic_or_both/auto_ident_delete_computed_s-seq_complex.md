# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident delete computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete ($(1), $(2), arg)[$("y")] || delete ($(1), $(2), arg)[$("y")];
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ = { y: 1 };
const tmpIfTest /*:boolean*/ = delete arg[tmpDeleteCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, arg);
} else {
  $(1);
  $(2);
  const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
  delete arg[tmpDeleteCompProp$1];
  $(a, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
const tmpIfTest = delete arg[tmpDeleteCompProp];
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, arg);
} else {
  $(1);
  $(2);
  const tmpDeleteCompProp$1 = $(`y`);
  delete arg[tmpDeleteCompProp$1];
  $(a, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( "y" );
const b = { y: 1 };
const c = delete b[ a ];
const d = {
  a: 999,
  b: 1000,
};
if (c) {
  $( d, b );
}
else {
  $( 1 );
  $( 2 );
  const e = $( "y" );
  delete b[ e ];
  $( d, b );
}
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
