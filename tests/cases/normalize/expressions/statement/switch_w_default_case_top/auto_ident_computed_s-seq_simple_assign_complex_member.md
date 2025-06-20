# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Statement > Switch w default case top > Auto ident computed s-seq simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    (1, 2, b)[$("c")] = $(b)[$("d")];
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
let tmpSwitchCaseToStart /*:number*/ /*ternaryConst*/ = 1;
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
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
if (tmpIfTest$3) {
  const tmpAssignComMemLhsProp /*:unknown*/ = $(`c`);
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCalleeParam /*:unknown*/ = $(`d`);
  const tmpAssignComputedRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
  b[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
} else {
  const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$5) {
    $(`fail1`);
    $(`fail2`);
  } else {
    $(`fail2`);
  }
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
if ($(1) === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 2;
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
const b = { c: 10, d: 20 };
if (tmpIfTest$3) {
  const tmpAssignComMemLhsProp = $(`c`);
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`d`);
  const tmpAssignComputedRhs = tmpCompObj[tmpCalleeParam];
  b[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
} else {
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
const c = $( 1 );
const d = c === a;
if (d) {
  b = 0;
}
else {
  const e = 2 === a;
  if (e) {
    b = 2;
  }
}
const f = b <= 0;
const g = {
  c: 10,
  d: 20,
};
if (f) {
  const h = $( "c" );
  const i = $( g );
  const j = $( "d" );
  const k = i[ j ];
  g[h] = k;
}
else {
  const l = b <= 1;
  if (l) {
    $( "fail1" );
    $( "fail2" );
  }
  else {
    $( "fail2" );
  }
}
const m = {
  a: 999,
  b: 1000,
};
$( m, g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
tmpSwitchBreak: {
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
    const tmpAssignComMemLhsObj = b;
    const tmpAssignComMemLhsProp = $(`c`);
    const tmpAssignComputedObj = tmpAssignComMemLhsObj;
    const tmpAssignComputedProp = tmpAssignComMemLhsProp;
    const tmpCompObj = $(b);
    const tmpCalleeParam = $(`d`);
    const tmpAssignComputedRhs = tmpCompObj[tmpCalleeParam];
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    break tmpSwitchBreak;
  } else {
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
  }
}
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'c'
 - 4: { c: '10', d: '20' }
 - 5: 'd'
 - 6: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
