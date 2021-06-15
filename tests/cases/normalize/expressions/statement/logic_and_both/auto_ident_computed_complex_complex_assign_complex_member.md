# Preval test case

# auto_ident_computed_complex_complex_assign_complex_member.md

> Normalize > Expressions > Statement > Logic and both > Auto ident computed complex complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
($(b)[$("c")] = $(b)[$("d")]) && ($(b)[$("c")] = $(b)[$("d")]);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
($(b)[$(`c`)] = $(b)[$(`d`)]) && ($(b)[$(`c`)] = $(b)[$(`d`)]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpIfTest = varInitAssignLhsComputedRhs;
if (tmpIfTest) {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`c`);
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const tmpAssignComputedRhs = tmpCompObj$1[tmpCompProp$1];
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
} else {
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 10, d: 20 };
const a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
if (varInitAssignLhsComputedRhs) {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`c`);
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const tmpAssignComputedRhs = tmpCompObj$1[tmpCompProp$1];
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
} else {
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: { c: '20', d: '20' }
 - 6: 'c'
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
