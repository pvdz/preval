# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Statement > Logic and both > Auto ident delete prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete ($(1), $(2), arg).y && delete ($(1), $(2), arg).y;
$(a, arg);
`````

## Settled


`````js filename=intro
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const tmpIfTest /*:boolean*/ = delete arg.y;
if (tmpIfTest) {
  $(1);
  $(2);
  delete arg.y;
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
const arg = { y: 1 };
if (delete arg.y) {
  $(1);
  $(2);
  delete arg.y;
}
$({ a: 999, b: 1000 }, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
delete ($(1), $(2), arg).y && delete ($(1), $(2), arg).y;
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = arg;
const tmpIfTest = delete tmpDeleteObj.y;
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteObj$1 = arg;
  delete tmpDeleteObj$1.y;
} else {
}
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = delete a.y;
if (b) {
  $( 1 );
  $( 2 );
  delete a.y;
}
const c = {
  a: 999,
  b: 1000,
};
$( c, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
