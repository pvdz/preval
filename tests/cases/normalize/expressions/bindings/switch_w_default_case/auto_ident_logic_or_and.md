# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident logic or and
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($(0)) || ($($(1)) && $($(2)));
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
  $(`fail1`);
  $(`fail2`);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_a$1) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_a$3 /*:unknown*/ = $(tmpCalleeParam$3);
    $(tmpClusterSSA_a$3);
    $(`fail1`);
    $(`fail2`);
  } else {
    $(tmpClusterSSA_a$1);
    $(`fail1`);
    $(`fail2`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = $($(0));
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
  $(`fail1`);
  $(`fail2`);
} else {
  const tmpClusterSSA_a$1 = $($(1));
  if (tmpClusterSSA_a$1) {
    $($($(2)));
    $(`fail1`);
    $(`fail2`);
  } else {
    $(tmpClusterSSA_a$1);
    $(`fail1`);
    $(`fail2`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  $( b );
  $( "fail1" );
  $( "fail2" );
}
else {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    const f = $( e );
    $( f );
    $( "fail1" );
    $( "fail2" );
  }
  else {
    $( d );
    $( "fail1" );
    $( "fail2" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  let tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  if (a) {
    $(a);
  } else {
    let tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
      let tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
      $(a);
    } else {
      $(a);
    }
  }
} else {
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(`fail1`);
} else {
}
const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$7) {
  $(`fail2`);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 'fail1'
 - 9: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
