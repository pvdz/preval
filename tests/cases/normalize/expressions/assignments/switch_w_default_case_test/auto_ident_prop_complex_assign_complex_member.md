# Preval test case

# auto_ident_prop_complex_assign_complex_member.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident prop complex assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = $(b).c = $(b)[$("d")]):
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
const b /*:object*/ = { c: 10, d: 20 };
const tmpNestedAssignObj /*:unknown*/ = $(b);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
const tmpIfTest /*:boolean*/ = tmpNestedPropAssignRhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 /*:boolean*/ = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(`fail1`);
  $(`fail2`);
  $(tmpNestedPropAssignRhs, b);
} else {
  $(`fail2`);
  $(tmpNestedPropAssignRhs, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const b = { c: 10, d: 20 };
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam];
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
if (tmpNestedPropAssignRhs === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 2;
  }
}
if (tmpSwitchCaseToStart <= 1) {
  $(`fail1`);
  $(`fail2`);
  $(tmpNestedPropAssignRhs, b);
} else {
  $(`fail2`);
  $(tmpNestedPropAssignRhs, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 1;
const c = {
  c: 10,
  d: 20,
};
const d = $( c );
const e = $( c );
const f = $( "d" );
const g = e[ f ];
d.c = g;
const h = g === a;
if (h) {
  b = 0;
}
else {
  const i = 2 === a;
  if (i) {
    b = 2;
  }
}
const j = b <= 1;
if (j) {
  $( "fail1" );
  $( "fail2" );
  $( g, c );
}
else {
  $( "fail2" );
  $( g, c );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { c: '10', d: '20' }
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 'fail1'
 - 6: 'fail2'
 - 7: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
