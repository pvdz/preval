# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Statement > Switch w default case test > Auto ident nested complex member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case ($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
    $("x")
  ] = $(b)[$("x")] = c):
    break;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 1;
  if (($(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = c) === tmpSwitchValue)
    tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 1) {
      $(`fail1`);
    }
    if (tmpSwitchCaseToStart <= 2) {
      $(`fail2`);
    }
  }
}
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(b);
const varInitAssignLhsComputedProp$1 = $(`x`);
const varInitAssignLhsComputedObj$3 = $(b);
const varInitAssignLhsComputedProp$3 = $(`x`);
const varInitAssignLhsComputedObj$5 = $(b);
const varInitAssignLhsComputedProp$5 = $(`x`);
const varInitAssignLhsComputedObj$7 = $(b);
const varInitAssignLhsComputedProp$7 = $(`x`);
const varInitAssignLhsComputedObj$9 = $(b);
const varInitAssignLhsComputedProp$9 = $(`x`);
const varInitAssignLhsComputedRhs$9 = c;
varInitAssignLhsComputedObj$9[varInitAssignLhsComputedProp$9] = varInitAssignLhsComputedRhs$9;
const varInitAssignLhsComputedRhs$7 = varInitAssignLhsComputedRhs$9;
varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = varInitAssignLhsComputedRhs$7;
const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$7;
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = varInitAssignLhsComputedRhs$5;
const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpBinLhs = varInitAssignLhsComputedRhs;
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
tmpSwitchBreak: {
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
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
$(a, b, c);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(b);
const varInitAssignLhsComputedProp$1 = $(`x`);
const varInitAssignLhsComputedObj$3 = $(b);
const varInitAssignLhsComputedProp$3 = $(`x`);
const varInitAssignLhsComputedObj$5 = $(b);
const varInitAssignLhsComputedProp$5 = $(`x`);
const varInitAssignLhsComputedObj$7 = $(b);
const varInitAssignLhsComputedProp$7 = $(`x`);
const varInitAssignLhsComputedObj$9 = $(b);
const varInitAssignLhsComputedProp$9 = $(`x`);
varInitAssignLhsComputedObj$9[varInitAssignLhsComputedProp$9] = 3;
varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
const tmpIfTest = 3 === tmpSwitchValue;
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
} else {
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$5) {
    $(`fail1`);
  } else {
  }
  $(`fail2`);
}
$(a, b, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
a: 999,
b: 1000
;
const c = $( 1 );
let d = 1;
const e = $( a );
const f = $( "x" );
const g = $( a );
const h = $( "x" );
const i = $( a );
const j = $( "x" );
const k = $( a );
const l = $( "x" );
const m = $( a );
const n = $( "x" );
const o = $( a );
const p = $( "x" );
o[p] = 3;
m[n] = 3;
k[l] = 3;
i[j] = 3;
g[h] = 3;
e[f] = 3;
const q = 3 === c;
if (q) {
  d = 0;
}
else {
  const r = 2 === c;
  if (r) {
    d = 2;
  }
}
const s = d <= 0;
if (s) {

}
else {
  const t = d <= 1;
  if (t) {
    $( "fail1" );
  }
  $( "fail2" );
}
$( b, a, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { x: '1' }
 - 5: 'x'
 - 6: { x: '1' }
 - 7: 'x'
 - 8: { x: '1' }
 - 9: 'x'
 - 10: { x: '1' }
 - 11: 'x'
 - 12: { x: '1' }
 - 13: 'x'
 - 14: 'fail1'
 - 15: 'fail2'
 - 16: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
