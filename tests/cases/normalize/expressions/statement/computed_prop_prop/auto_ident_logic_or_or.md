# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$($(0)) || $($(1)) || $($(2))];
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let tmpCompProp /*:unknown*/ = $(tmpCalleeParam);
if (tmpCompProp) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpCompProp = $(tmpCalleeParam$1);
  if (tmpCompProp) {
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    tmpCompProp = $(tmpCalleeParam$3);
  }
}
const obj /*:object*/ = {};
obj[tmpCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCompProp = $($(0));
if (!tmpCompProp) {
  tmpCompProp = $($(1));
  if (!tmpCompProp) {
    tmpCompProp = $($(2));
  }
}
({}[tmpCompProp]);
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$($(0)) || $($(1)) || $($(2))];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCalleeParam = $(0);
let tmpCompProp = $(tmpCalleeParam);
if (tmpCompProp) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpCompProp = $(tmpCalleeParam$1);
  if (tmpCompProp) {
  } else {
    const tmpCalleeParam$3 = $(2);
    tmpCompProp = $(tmpCalleeParam$3);
  }
}
tmpCompObj[tmpCompProp];
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {

  }
  else {
    const d = $( 2 );
    b = $( d );
  }
}
const e = {};
e[ b ];
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
