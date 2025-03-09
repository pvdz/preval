# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > Ternary b > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(1) ? b[$("c")] : $(200);
$(a, b);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { c: 1 };
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCompProp /*:unknown*/ = $(`c`);
  b[tmpCompProp];
  $(a, b);
} else {
  $(200);
  $(a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const b = { c: 1 };
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCompProp = $(`c`);
  b[tmpCompProp];
  $(a, b);
} else {
  $(200);
  $(a, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(1) ? b[$(`c`)] : $(200);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCompObj = b;
  const tmpCompProp = $(`c`);
  tmpCompObj[tmpCompProp];
  $(a, b);
} else {
  $(200);
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { c: 1 };
const c = {
  a: 999,
  b: 1000,
};
if (a) {
  const d = $( "c" );
  b[ d ];
  $( c, b );
}
else {
  $( 200 );
  $( c, b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'c'
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
