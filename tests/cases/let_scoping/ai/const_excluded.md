# Preval test case

# const_excluded.md

> Let scoping > Ai > Const excluded
>
> Test let scoping exclusion: const declarations should not be moved

## Input

`````js filename=intro
const x = $(1);
if ($(true)) { $(false); } else {}
if ($(true)) {
  $(() => x);
  $(x);
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 /*:unknown*/ = $(true);
if (tmpIfTest$1) {
  const tmpCalleeParam /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
if ($(true)) {
  $(false);
}
if ($(true)) {
  $(function () {
    return x;
  });
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( true );
if (b) {
  $( false );
}
const c = $( true );
if (c) {
  const d = function() {
    debugger;
    return a;
  };
  $( d );
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1);
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  let tmpCalleeParam = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: true
 - 3: false
 - 4: true
 - 5: '<function>'
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
