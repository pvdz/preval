# Preval test case

# auto_ident_prop_simple_assign_complex_member.md

> Normalize > Expressions > Bindings > Switch case > Auto ident prop simple assign complex member
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 10, d: 20 };

    let a = (b.c = $(b)[$("d")]);
    $(a, b);
}
`````

## Normalized

`````js filename=intro
let b;
let tmpCompObj;
let tmpCompProp;
let varInitAssignLhsComputedRhs;
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  b = { c: 10, d: 20 };
  tmpCompObj = $(b);
  tmpCompProp = $('d');
  varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  b.c = varInitAssignLhsComputedRhs;
  a = varInitAssignLhsComputedRhs;
  $(a, b);
}
`````

## Output

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
b.c = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 20, { c: '20', d: '20' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
