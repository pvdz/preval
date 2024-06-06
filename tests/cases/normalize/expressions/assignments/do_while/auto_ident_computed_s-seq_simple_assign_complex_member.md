# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Do while > Auto ident computed s-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (1, 2, b)[$("c")] = $(b)[$("d")]));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = (1, 2, b)[$(`c`)] = $(b)[$(`d`)])) {
  } else {
    break;
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpNestedAssignComMemberObj = b;
  const tmpNestedAssignComMemberProp = $(`c`);
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
$(100);
const tmpNestedAssignComMemberProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
let tmpClusterSSA_a = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpNestedAssignComMemberProp$1 = $(`c`);
    const tmpCompObj$1 = $(b);
    const tmpCompProp$1 = $(`d`);
    const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
    b[tmpNestedAssignComMemberProp$1] = tmpNestedAssignPropRhs$1;
    tmpClusterSSA_a = tmpNestedAssignPropRhs$1;
    if (tmpNestedAssignPropRhs$1) {
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
$( 100 );
const b = $( "c" );
const c = {
c: 10,
d: 20
;
const d = $( c );
const e = $( "d" );
const f = d[ e ];
c[b] = f;
let g = f;
if (f) {

}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const h = $( "c" );
    const i = $( c );
    const j = $( "d" );
    const k = i[ j ];
    c[h] = k;
    g = k;
    if (k) {

    }
    else {
      break;
    }
  }
}
$( g, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 100
 - 6: 'c'
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 100
 - 10: 'c'
 - 11: { c: '20', d: '20' }
 - 12: 'd'
 - 13: 100
 - 14: 'c'
 - 15: { c: '20', d: '20' }
 - 16: 'd'
 - 17: 100
 - 18: 'c'
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 100
 - 22: 'c'
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 100
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
