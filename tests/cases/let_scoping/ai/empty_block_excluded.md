# Preval test case

# empty_block_excluded.md

> Let scoping > Ai > Empty block excluded
>
> Test let scoping exclusion: empty block should not trigger move

## Input

`````js filename=intro
let x = 1;
if ($(true)) { $(false); } else {}
if ($(true)) {
  // Empty block
}
$(() => x);
$(x);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
const tmpBool /*:boolean*/ /*banged*/ = !tmpIfTest;
$(tmpBool);
if (tmpIfTest) {
  $(true);
} else {
}
const tmpCalleeParam /*:()=>number*/ = function $pcompiled() {
  debugger;
  return 1;
};
$(tmpCalleeParam);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(true);
$(!tmpIfTest);
if (tmpIfTest) {
  $(true);
}
$(function $pcompiled() {
  return 1;
});
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = !a;
$( b );
if (a) {
  $( true );
}
const c = function $pcompiled() {
  debugger;
  return 1;
};
$( c );
$( 1 );
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
 - 4: '<function>'
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
