# Preval test case

# auto_ident_prop_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > For b > Auto ident prop simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; (a = b.c = $(b)[$("d")]); $(1));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  while ((a = b.c = $(b)[$(`d`)])) {
    $(1);
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  b.c = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let $tmpLoopUnrollCheck = true;
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
b.c = tmpNestedAssignPropRhs;
let tmpSSA_a = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpCompObj$1 = $(b);
    const tmpCompProp$1 = $(`d`);
    const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
    b.c = tmpNestedAssignPropRhs$1;
    tmpSSA_a = tmpNestedAssignPropRhs$1;
    if (tmpNestedAssignPropRhs$1) {
      $(1);
    } else {
      break;
    }
  }
} else {
}
$(tmpSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
const b = {
c: 10,
d: 20
;
const c = $( b );
const d = $( "d" );
const e = c[ d ];
b.c = e;
let f = e;
if (e) {
  $( 1 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const g = $( b );
    const h = $( "d" );
    const i = g[ h ];
    b.c = i;
    f = i;
    if (i) {
      $( 1 );
    }
    else {
      break;
    }
  }
}
$( f, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 1
 - 4: { c: '20', d: '20' }
 - 5: 'd'
 - 6: 1
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 1
 - 10: { c: '20', d: '20' }
 - 11: 'd'
 - 12: 1
 - 13: { c: '20', d: '20' }
 - 14: 'd'
 - 15: 1
 - 16: { c: '20', d: '20' }
 - 17: 'd'
 - 18: 1
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 1
 - 22: { c: '20', d: '20' }
 - 23: 'd'
 - 24: 1
 - 25: { c: '20', d: '20' }
 - 26: 'd'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
