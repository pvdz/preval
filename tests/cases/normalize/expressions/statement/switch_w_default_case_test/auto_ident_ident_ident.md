# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > Switch w default case test > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (b = 2):
    break;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(1);
const tmpIfTest$3 /*:boolean*/ = 2 === tmpSwitchValue;
if (tmpIfTest$3) {
} else {
  $(`fail1`);
  $(`fail2`);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 2, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
if (!(2 === tmpSwitchValue)) {
  $(`fail1`);
  $(`fail2`);
}
$({ a: 999, b: 1000 }, 2, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = 2 === a;
if (b) {

}
else {
  $( "fail1" );
  $( "fail2" );
}
const c = {
  a: 999,
  b: 1000,
};
$( c, 2, 2 );
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
 - 4: { a: '999', b: '1000' }, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
