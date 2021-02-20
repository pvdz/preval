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

## Normalized

`````js filename=intro
let obj = {
  get c() {
    $('get');
  },
  set c(x) {
    $('set');
  },
};
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
const tmpSwitchTest = $('a');
let varInitAssignLhsComputedObj;
let varInitAssignLhsComputedProp;
let varInitAssignLhsComputedObj$1;
let varInitAssignLhsComputedProp$1;
let varInitAssignLhsComputedRhs$1;
let varInitAssignLhsComputedRhs;
let a$1;
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $('a');
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    varInitAssignLhsComputedObj = $(obj);
    varInitAssignLhsComputedProp = $('x');
    varInitAssignLhsComputedObj$1 = $(obj);
    varInitAssignLhsComputedProp$1 = $('y');
    varInitAssignLhsComputedRhs$1 = $(d);
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
    varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    a$1 = varInitAssignLhsComputedRhs;
    break tmpSwitchBreak;
  }
}
$(a, b, c, d, obj);
`````

## Output

`````js filename=intro
const obj = {
  get c() {
    $('get');
  },
  set c(x) {
    $('set');
  },
};
const b = { x: 2 };
const tmpSwitchTest = $('a');
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $('a');
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    const varInitAssignLhsComputedObj = $(obj);
    const varInitAssignLhsComputedProp = $('x');
    const varInitAssignLhsComputedObj$1 = $(obj);
    const varInitAssignLhsComputedProp$1 = $('y');
    const varInitAssignLhsComputedRhs$1 = $(4);
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$1;
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

Normalized calls: Same

Final output calls: Same
