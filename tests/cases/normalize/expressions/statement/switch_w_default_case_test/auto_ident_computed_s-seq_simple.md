# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Switch w default case test > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (1, 2, b)[$("c")]:
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
let tmpSwitchCaseToStart /*:number*/ = 1;
const tmpCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
const tmpBinLhs /*:unknown*/ = b[tmpCompProp];
const tmpIfTest /*:boolean*/ = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 /*:boolean*/ = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$3 /*:boolean*/ = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
} else {
  const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$5) {
    $(`fail1`);
    $(`fail2`);
  } else {
    $(`fail2`);
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpCompProp = $(`c`);
const b = { c: 1 };
if (b[tmpCompProp] === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 2;
  }
}
if (!(tmpSwitchCaseToStart <= 0)) {
  if (tmpSwitchCaseToStart <= 1) {
    $(`fail1`);
    $(`fail2`);
  } else {
    $(`fail2`);
  }
}
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 1;
const c = $( "c" );
const d = { c: 1 };
const e = d[ c ];
const f = e === a;
if (f) {
  b = 0;
}
else {
  const g = 2 === a;
  if (g) {
    b = 2;
  }
}
const h = b <= 0;
if (h) {

}
else {
  const i = b <= 1;
  if (i) {
    $( "fail1" );
    $( "fail2" );
  }
  else {
    $( "fail2" );
  }
}
const j = {
  a: 999,
  b: 1000,
};
$( j, d );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'c'
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
