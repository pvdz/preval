# Preval test case

# labeled_statement.md

> Let scoping > Ai > Labeled statement
>
> Test let scoping with labeled statements: let used only in labeled block

## Input

`````js filename=intro
let x = 1;
if ($(true)) { $(false); } else {}
label: {
  if ($(true)) x = $(2);
  $(() => x);
  $(x);
}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = 1;
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 /*:unknown*/ = $(true);
if (tmpIfTest$1) {
  x = $(2);
} else {
}
const tmpCalleeParam /*:()=>unknown*/ = function () {
  debugger;
  return x;
};
$(tmpCalleeParam);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
if ($(true)) {
  $(false);
}
if ($(true)) {
  x = $(2);
}
$(function () {
  return x;
});
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
const b = $( true );
if (b) {
  $( false );
}
const c = $( true );
if (c) {
  a = $( 2 );
}
const d = function() {
  debugger;
  return a;
};
$( d );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  x = $(2);
} else {
}
let tmpCalleeParam = function () {
  debugger;
  return x;
};
$(tmpCalleeParam);
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - 3: true
 - 4: 2
 - 5: '<function>'
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
