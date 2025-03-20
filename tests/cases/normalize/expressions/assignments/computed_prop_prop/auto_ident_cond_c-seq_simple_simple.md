# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = (10, 20, $(30)) ? $(2) : $($(100)))];
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(30);
let tmpCompProp /*:unknown*/ = undefined;
if (tmpIfTest) {
  a = $(2);
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
const tmpIfTest = $(30);
let tmpCompProp = undefined;
if (tmpIfTest) {
  a = $(2);
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
const b = $( 30 );
let c = undefined;
if (b) {
  a = $( 2 );
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
 - 1: 30
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
