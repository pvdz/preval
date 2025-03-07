# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident delete computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete ($(1), $(2), arg)[$("y")] && delete ($(1), $(2), arg)[$("y")];
$(a, arg);
`````

## Settled


`````js filename=intro
$(1);
$(2);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ = { y: 1 };
const tmpIfTest /*:boolean*/ = delete arg[tmpDeleteCompProp];
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
  delete arg[tmpDeleteCompProp$1];
} else {
}
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
if (delete arg[tmpDeleteCompProp]) {
  $(1);
  $(2);
  const tmpDeleteCompProp$1 = $(`y`);
  delete arg[tmpDeleteCompProp$1];
}
$({ a: 999, b: 1000 }, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
delete ($(1), $(2), arg)[$(`y`)] && delete ($(1), $(2), arg)[$(`y`)];
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $(`y`);
const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteCompObj$1 = arg;
  const tmpDeleteCompProp$1 = $(`y`);
  delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
} else {
}
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( "y" );
const b = { y: 1 };
const c = delete b[ a ];
if (c) {
  $( 1 );
  $( 2 );
  const d = $( "y" );
  delete b[ d ];
}
const e = {
  a: 999,
  b: 1000,
};
$( e, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: 1
 - 5: 2
 - 6: 'y'
 - 7: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
