# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident cond complex simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $(1) ? 2 : $($(100)))];
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = 2;
const tmpIfTest /*:unknown*/ = $(1);
let tmpCompProp /*:unknown*/ = 2;
if (tmpIfTest) {
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
let a = 2;
const tmpIfTest = $(1);
let tmpCompProp = 2;
if (!tmpIfTest) {
  a = $($(100));
  tmpCompProp = a;
}
({}[tmpCompProp]);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 2;
const b = $( 1 );
let c = 2;
if (b) {

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
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
