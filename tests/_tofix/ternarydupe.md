# Preval test case

# ternarydupe.md

> Tofix > ternarydupe
>
> Normalization of assignments should work the same everywhere they are

existing test
make sure we eliminate the var GETRIDOFME as a dupe for a
this is a regression

## Input

`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const notnullable /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = notnullable == null;
let GETRIDOFME /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpIfTest) {
} else {
  a = $dotCall(notnullable, $, undefined, 1);
  GETRIDOFME = a;
}
if (a) {
  $(GETRIDOFME);
  $(a);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
}
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const notnullable /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = notnullable == null;
let GETRIDOFME /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpIfTest) {
} else {
  a = $dotCall(notnullable, $, undefined, 1);
  GETRIDOFME = a;
}
if (a) {
  $(GETRIDOFME);
  $(a);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const notnullable = $($);
const tmpIfTest = notnullable == null;
let GETRIDOFME = undefined;
if (!tmpIfTest) {
  a = $dotCall(notnullable, $, undefined, 1);
  GETRIDOFME = a;
}
if (a) {
  $(GETRIDOFME);
  $(a);
} else {
  $($(100));
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( $ );
const c = b == null;
let d = undefined;
if (c) {

}
else {
  a = $dotCall( b, $, undefined, 1 );
  d = a;
}
if (a) {
  $( d );
  $( a );
}
else {
  const e = $( 100 );
  $( e );
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
const notnullable = $($);
const tmpIfTest = notnullable == null;
let GETRIDOFME = undefined;
if (tmpIfTest) {
} else {
  a = $dotCall(notnullable, $, undefined, 1);
  GETRIDOFME = a;
}
if (a) {
  $(GETRIDOFME);
  $(a);
} else {
  const tmpClusterSSA_tmpCalleeParam = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
