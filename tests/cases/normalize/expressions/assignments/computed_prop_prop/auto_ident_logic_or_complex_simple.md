# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $($(0)) || 2)];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam);
let tmpCompProp /*:unknown*/ = 2;
if (a) {
  tmpCompProp = a;
} else {
  a = 2;
}
const obj /*:object*/ = {};
obj[tmpCompProp];
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(0));
let tmpCompProp = 2;
if (a) {
  tmpCompProp = a;
} else {
  a = 2;
}
({}[tmpCompProp]);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
let c = 2;
if (b) {
  c = b;
}
else {
  b = 2;
}
const d = {};
d[ c ];
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
