# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Statement > For a > Auto ident s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for ($(1), $(2), x; $(0); );
$(a, x);
`````

## Settled


`````js filename=intro
$(1);
$(2);
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(0);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
if ($(0)) {
  while (true) {
    if (!$(0)) {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  $(1), $(2), x;
  while ($(0)) {}
}
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
while (true) {
  const tmpIfTest = $(0);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 0 );
if (a) {
  while ($LOOP_UNROLL_10) {
    const b = $( 0 );
    if (b) {

    }
    else {
      break;
    }
  }
}
const c = {
  a: 999,
  b: 1000,
};
$( c, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 0
 - 4: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
