# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> Normalize > Expressions > Statement > For let > Auto ident prop s-seq assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (let xyz = ((1, 2, b).c = $(b)[$("d")]); ; $(1)) $(xyz);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  let xyz = ((1, 2, b).c = $(b)[$(`d`)]);
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = b;
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
let xyz = varInitAssignLhsComputedRhs;
while (true) {
  $(xyz);
  $(1);
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 10, d: 20 };
const a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
b.c = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(varInitAssignLhsComputedRhs);
  $(1);
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 20
 - 4: 1
 - 5: 20
 - 6: 1
 - 7: 20
 - 8: 1
 - 9: 20
 - 10: 1
 - 11: 20
 - 12: 1
 - 13: 20
 - 14: 1
 - 15: 20
 - 16: 1
 - 17: 20
 - 18: 1
 - 19: 20
 - 20: 1
 - 21: 20
 - 22: 1
 - 23: 20
 - 24: 1
 - 25: 20
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
