# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Assignments > Switch w default case block > Auto ident obj pattern assign
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = { x, y } = { x: $(3), y: $(4) };
  }
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, x, y);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = 1;
let y /*:unknown*/ = 2;
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpSwitchValue /*:unknown*/ = $(1);
let tmpSwitchCaseToStart /*:number*/ = 1;
const tmpBinLhs /*:unknown*/ = $(1);
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
  const tmpObjLitVal /*:unknown*/ = $(3);
  const tmpObjLitVal$1 /*:unknown*/ = $(4);
  x = tmpObjLitVal;
  y = tmpObjLitVal$1;
  const tmpNestedAssignObjPatternRhs /*:object*/ = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  a = tmpNestedAssignObjPatternRhs;
} else {
}
const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(`fail1`);
  $(`fail2`);
  $(a, x, y);
} else {
  $(`fail2`);
  $(a, x, y);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
if ($(1) === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 2;
  }
}
if (tmpSwitchCaseToStart <= 0) {
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  x = tmpObjLitVal;
  y = tmpObjLitVal$1;
  a = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
}
if (tmpSwitchCaseToStart <= 1) {
  $(`fail1`);
  $(`fail2`);
  $(a, x, y);
} else {
  $(`fail2`);
  $(a, x, y);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
let b = 2;
let c = {
  a: 999,
  b: 1000,
};
const d = $( 1 );
let e = 1;
const f = $( 1 );
const g = f === d;
if (g) {
  e = 0;
}
else {
  const h = 2 === d;
  if (h) {
    e = 2;
  }
}
const i = e <= 0;
if (i) {
  const j = $( 3 );
  const k = $( 4 );
  a = j;
  b = k;
  const l = {
    x: j,
    y: k,
  };
  c = l;
}
const m = e <= 1;
if (m) {
  $( "fail1" );
  $( "fail2" );
  $( c, a, b );
}
else {
  $( "fail2" );
  $( c, a, b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 3
 - 4: 4
 - 5: 'fail1'
 - 6: 'fail2'
 - 7: { x: '3', y: '4' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
