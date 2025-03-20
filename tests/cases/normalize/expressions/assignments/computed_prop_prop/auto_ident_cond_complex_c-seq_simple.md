# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident cond complex c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $(1) ? (40, 50, $(60)) : $($(100)))];
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(1);
let tmpCompProp /*:unknown*/ = undefined;
if (tmpIfTest) {
  a = $(60);
  tmpCompProp = a;
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  a = $(tmpCalleeParam);
  tmpCompProp = a;
}
const obj /*:object*/ = {};
obj[tmpCompProp];
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpIfTest = $(1);
let tmpCompProp = undefined;
if (tmpIfTest) {
  a = $(60);
  tmpCompProp = a;
} else {
  a = $($(100));
  tmpCompProp = a;
}
({}[tmpCompProp]);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
let c = undefined;
if (b) {
  a = $( 60 );
  c = a;
}
else {
  const d = $( 100 );
  a = $( d );
  c = a;
}
const e = {};
e[ c ];
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
