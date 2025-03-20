# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident cond complex simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = $(1) ? 2 : $($(100)))["a"];
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = 2;
const tmpIfTest /*:unknown*/ = $(1);
let tmpCompObj /*:unknown*/ = 2;
if (tmpIfTest) {
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  a = $(tmpCalleeParam);
  tmpCompObj = a;
}
tmpCompObj.a;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = 2;
const tmpIfTest = $(1);
let tmpCompObj = 2;
if (!tmpIfTest) {
  a = $($(100));
  tmpCompObj = a;
}
tmpCompObj.a;
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
c.a;
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
