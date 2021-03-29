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
    $('get');
  },
  set c($$0) {
    let x = $$0;
    debugger;
    $('set');
  },
};
let a = 1,
  b = { x: 2 },
  c = 3,
  d = 4;
{
  let a$1;
  const tmpSwitchValue = $('a');
  let tmpSwitchCaseToStart = 1;
  if ($('a') === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      a$1 = $(obj)[$('x')] = $(obj)[$('y')] = $(d);
      break tmpSwitchBreak;
    }
  }
}
$(a, b, c, d, obj);
`````

## Normalized

`````js filename=intro
let obj = {
  get c() {
    debugger;
    $('get');
  },
  set c($$0) {
    let x = $$0;
    debugger;
    $('set');
  },
};
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
let a$1 = undefined;
const tmpSwitchValue = $('a');
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $('a');
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    const tmpNestedAssignComMemberObj = $(obj);
    const tmpNestedAssignComMemberProp = $('x');
    const varInitAssignLhsComputedObj = $(obj);
    const varInitAssignLhsComputedProp = $('y');
    const varInitAssignLhsComputedRhs = $(d);
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    a$1 = tmpNestedPropAssignRhs;
    break tmpSwitchBreak;
  }
}
$(a, b, c, d, obj);
`````

## Output

`````js filename=intro
const obj = {
  get c() {
    debugger;
    $('get');
  },
  set c($$0) {
    debugger;
    $('set');
  },
};
const b = { x: 2 };
const tmpSwitchValue = $('a');
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $('a');
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    const tmpNestedAssignComMemberObj = $(obj);
    const tmpNestedAssignComMemberProp = $('x');
    const varInitAssignLhsComputedObj = $(obj);
    const varInitAssignLhsComputedProp = $('y');
    const varInitAssignLhsComputedRhs = $(4);
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = varInitAssignLhsComputedRhs;
    break tmpSwitchBreak;
  }
}
$(1, b, 3, 4, obj);
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
