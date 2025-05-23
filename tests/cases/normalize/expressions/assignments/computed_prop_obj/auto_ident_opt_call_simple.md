# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = $?.(1))["a"];
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
let tmpCompObj /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpIfTest) {
} else {
  a = $(1);
  tmpCompObj = a;
}
tmpCompObj.a;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpIfTest = $ == null;
let tmpCompObj = undefined;
if (!tmpIfTest) {
  a = $(1);
  tmpCompObj = a;
}
tmpCompObj.a;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
let c = undefined;
if (b) {

}
else {
  a = $( 1 );
  c = a;
}
c.a;
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
