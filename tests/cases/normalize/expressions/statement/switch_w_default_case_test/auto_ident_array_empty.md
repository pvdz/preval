# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Statement > Switch w default case test > Auto ident array empty
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case []:
    break;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````


## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(1);
const tmpIfTest$1 /*:boolean*/ = 2 === tmpSwitchValue;
if (tmpIfTest$1) {
  $(`fail2`);
} else {
  $(`fail1`);
  $(`fail2`);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
if (2 === tmpSwitchValue) {
  $(`fail2`);
} else {
  $(`fail1`);
  $(`fail2`);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = 2 === a;
if (b) {
  $( "fail2" );
}
else {
  $( "fail1" );
  $( "fail2" );
}
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'fail1'
 - 3: 'fail2'
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
