# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Statement > Switch default > Auto ident delete prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    delete ($(1), $(2), arg).y;
}
$(a, arg);
`````

## Settled


`````js filename=intro
$(1);
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
delete arg.y;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1);
$(2);
const arg = { y: 1 };
delete arg.y;
$({ a: 999, b: 1000 }, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    delete ($(1), $(2), arg).y;
  } else {
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
$(1);
$(2);
const tmpDeleteObj = arg;
delete tmpDeleteObj.y;
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 1 );
$( 2 );
const a = { y: 1 };
delete a.y;
const b = {
  a: 999,
  b: 1000,
};
$( b, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
