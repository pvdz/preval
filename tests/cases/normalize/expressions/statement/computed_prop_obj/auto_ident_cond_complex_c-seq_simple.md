# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
($(1) ? (40, 50, $(60)) : $($(100)))["a"];
$(a);
`````

## Settled


`````js filename=intro
let tmpCompObj /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  tmpCompObj = $(60);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  tmpCompObj = $(tmpCalleeParam);
}
tmpCompObj.a;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCompObj = undefined;
if ($(1)) {
  tmpCompObj = $(60);
} else {
  tmpCompObj = $($(100));
}
tmpCompObj.a;
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
($(1) ? (40, 50, $(60)) : $($(100)))[`a`];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpCompObj = $(60);
} else {
  const tmpCalleeParam = $(100);
  tmpCompObj = $(tmpCalleeParam);
}
tmpCompObj.a;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
if (b) {
  a = $( 60 );
}
else {
  const c = $( 100 );
  a = $( c );
}
a.a;
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
