# Preval test case

# ident_computed_member_complex_assign.md

> Normalize > Binding > Case-block > Ident computed member complex assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let obj = {
  get c()  { $('get'); }, 
  set c(x) { $('set'); },
};
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { case $('a'): let a = $(obj)[$('x')] = $(obj)[$('y')] = $(d); break; }
$(a, b, c, d, obj);
`````

## Pre Normal


`````js filename=intro
let obj = {
  get c() {
    debugger;
    $(`get`);
  },
  set c($$0) {
    let x = $$0;
    debugger;
    $(`set`);
  },
};
let a = 1,
  b = { x: 2 },
  c = 3,
  d = 4;
tmpSwitchBreak: {
  let a$1;
  const tmpSwitchDisc = $(`a`);
  if (tmpSwitchDisc === $(`a`)) {
    a$1 = $(obj)[$(`x`)] = $(obj)[$(`y`)] = $(d);
    break tmpSwitchBreak;
  } else {
  }
}
$(a, b, c, d, obj);
`````

## Normalized


`````js filename=intro
let obj = {
  get c() {
    debugger;
    $(`get`);
    return undefined;
  },
  set c($$0) {
    let x = $$0;
    debugger;
    $(`set`);
    return undefined;
  },
};
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpSwitchBreak: {
  let a$1 = undefined;
  const tmpSwitchDisc = $(`a`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(`a`);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    const tmpNestedAssignComMemberObj = $(obj);
    const tmpNestedAssignComMemberProp = $(`x`);
    const varInitAssignLhsComputedObj = $(obj);
    const varInitAssignLhsComputedProp = $(`y`);
    const varInitAssignLhsComputedRhs = $(d);
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    a$1 = tmpNestedPropAssignRhs;
    break tmpSwitchBreak;
  } else {
  }
}
$(a, b, c, d, obj);
`````

## Output


`````js filename=intro
const obj = {
  get c() {
    debugger;
    $(`get`);
    return undefined;
  },
  set c($$0) {
    debugger;
    $(`set`);
    return undefined;
  },
};
const b = { x: 2 };
const tmpSwitchDisc = $(`a`);
const tmpBinBothRhs = $(`a`);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpNestedAssignComMemberObj = $(obj);
  const tmpNestedAssignComMemberProp = $(`x`);
  const varInitAssignLhsComputedObj = $(obj);
  const varInitAssignLhsComputedProp = $(`y`);
  const varInitAssignLhsComputedRhs = $(4);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = varInitAssignLhsComputedRhs;
} else {
}
$(1, b, 3, 4, obj);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  get c() {
    debugger;
    $( "get" );
    return undefined;
  },
  set c( $$0 ) {
    debugger;
    $( "set" );
    return undefined;
  },
};
const b = { x: 2 };
const c = $( "a" );
const d = $( "a" );
const e = c === d;
if (e) {
  const f = $( a );
  const g = $( "x" );
  const h = $( a );
  const i = $( "y" );
  const j = $( 4 );
  h[i] = j;
  f[g] = j;
}
$( 1, b, 3, 4, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: { c: '<get/set>' }
 - 4: 'x'
 - 5: { c: '<get/set>' }
 - 6: 'y'
 - 7: 4
 - 8: 1, { x: '2' }, 3, 4, { c: '<get/set>', y: '4', x: '4' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
