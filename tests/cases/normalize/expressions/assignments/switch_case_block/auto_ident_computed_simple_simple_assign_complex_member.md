# Preval test case

# auto_ident_computed_simple_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident computed simple simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = b["c"] = $(b)[$("d")];
  }
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      a = b[`c`] = $(b)[$(`d`)];
    }
  } else {
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  b.c = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
} else {
}
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 10, d: 20 };
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  b.c = tmpNestedAssignPropRhs;
  $(tmpNestedAssignPropRhs, b);
} else {
  const a = { a: 999, b: 1000 };
  $(a, b);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  c: 10,
  d: 20,
};
const b = $( 1 );
const c = $( 1 );
const d = b === c;
if (d) {
  const e = $( a );
  const f = $( "d" );
  const g = e[ f ];
  a.c = g;
  $( g, a );
}
else {
  const h = {
    a: 999,
    b: 1000,
  };
  $( h, a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
