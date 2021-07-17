# Preval test case

# auto_ident_computed_complex_complex_assign_complex_member.md

> Normalize > Expressions > Statement > For a > Auto ident computed complex complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for ($(b)[$("c")] = $(b)[$("d")]; $(0); );
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  $(b)[$(`c`)] = $(b)[$(`d`)];
  while ($(0)) {}
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpAssignComMemLhsObj = $(b);
const tmpAssignComMemLhsProp = $(`c`);
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
let tmpIfTest = $(0);
while (tmpIfTest) {
  tmpIfTest = $(0);
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 10, d: 20 };
const a = { a: 999, b: 1000 };
const tmpAssignComMemLhsObj = $(b);
const tmpAssignComMemLhsProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
let tmpIfTest = $(0);
while (tmpIfTest) {
  tmpIfTest = $(0);
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
 - 5: 0
 - 6: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
