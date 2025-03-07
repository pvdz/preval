# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
((10, 20, $(30)) ? $(2) : $($(100))).a;
$(a);
`````

## Settled


`````js filename=intro
let tmpCompObj /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
  tmpCompObj = $(2);
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
if ($(30)) {
  tmpCompObj = $(2);
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
((10, 20, $(30)) ? $(2) : $($(100))).a;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpCompObj = $(2);
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
const b = $( 30 );
if (b) {
  a = $( 2 );
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
 - 1: 30
 - 2: 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
