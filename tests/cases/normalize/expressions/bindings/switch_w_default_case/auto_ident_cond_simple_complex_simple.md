# Preval test case

# auto_ident_cond_simple_complex_simple.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident cond simple complex simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = 1 ? $(2) : $($(100));
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(2);
$(a);
$(`fail1`);
$(`fail2`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(2));
$(`fail1`);
$(`fail2`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a );
$( "fail1" );
$( "fail2" );
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
  a = $(2);
  $(a);
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
 - 1: 2
 - 2: 2
 - 3: 'fail1'
 - 4: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
