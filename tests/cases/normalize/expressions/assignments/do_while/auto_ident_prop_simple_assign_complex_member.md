# Preval test case

# auto_ident_prop_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Do while > Auto ident prop simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = b.c = $(b)[$("d")]));
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
  if ((a = b.c = $(b)[$(`d`)])) {
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
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  b.c = tmpNestedPropAssignRhs;
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
$(100);
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const tmpNestedAssignPropRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
b.c = tmpNestedAssignPropRhs;
let tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCompObj$1 /*:unknown*/ = $(b);
    const tmpCompProp$1 /*:unknown*/ = $(`d`);
    const tmpNestedAssignPropRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
    b.c = tmpNestedAssignPropRhs$1;
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
$( 100 );
const a = {
  c: 10,
  d: 20,
};
const b = $( a );
const c = $( "d" );
const d = b[ c ];
a.c = d;
let e = d;
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const f = $( a );
    const g = $( "d" );
    const h = f[ g ];
    a.c = h;
    e = h;
    if (h) {

    }
    else {
      break;
    }
  }
}
$( e, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 100
 - 5: { c: '20', d: '20' }
 - 6: 'd'
 - 7: 100
 - 8: { c: '20', d: '20' }
 - 9: 'd'
 - 10: 100
 - 11: { c: '20', d: '20' }
 - 12: 'd'
 - 13: 100
 - 14: { c: '20', d: '20' }
 - 15: 'd'
 - 16: 100
 - 17: { c: '20', d: '20' }
 - 18: 'd'
 - 19: 100
 - 20: { c: '20', d: '20' }
 - 21: 'd'
 - 22: 100
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 100
 - 26: { c: '20', d: '20' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- objects in isFree check