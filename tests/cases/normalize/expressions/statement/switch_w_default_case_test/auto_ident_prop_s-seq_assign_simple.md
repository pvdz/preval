# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Statement > Switch w default case test > Auto ident prop s-seq assign simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case ((1, 2, b).c = 2):
    break;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b);
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
const b /*:object*/ = { c: 2 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
if (!(2 === tmpSwitchValue)) {
  $(`fail1`);
  $(`fail2`);
}
$({ a: 999, b: 1000 }, { c: 2 });
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
const d = { c: 2 };
$( c, d );
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
 - 4: { a: '999', b: '1000' }, { c: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
