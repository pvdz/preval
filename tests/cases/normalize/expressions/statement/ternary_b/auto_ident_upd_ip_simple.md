# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Statement > Ternary b > Auto ident upd ip simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(1) ? b++ : $(200);
$(a, b);
`````

## Settled


`````js filename=intro
let b /*:number*/ = 1;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  b = 2;
} else {
  $(200);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = 1;
if ($(1)) {
  b = 2;
} else {
  $(200);
}
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$(1) ? b++ : $(200);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpPostUpdArgIdent = $coerce(b, `number`);
  b = tmpPostUpdArgIdent + 1;
} else {
  $(200);
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 1;
const b = $( 1 );
if (b) {
  a = 2;
}
else {
  $( 200 );
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
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
