# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > For c > Auto ident computed s-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; $(1); a = (1, 2, b)[$("c")] = $(b)[$("d")]);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = (1, 2, b)[$(`c`)] = $(b)[$(`d`)];
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpNestedAssignComMemberObj = b;
    const tmpNestedAssignComMemberProp = $(`c`);
    const tmpCompObj = $(b);
    const tmpCompProp = $(`d`);
    const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { c: 10, d: 20 };
if (tmpIfTest) {
  const tmpNestedAssignComMemberProp /*:unknown*/ = $(`c`);
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCompProp /*:unknown*/ = $(`d`);
  const tmpNestedAssignPropRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
  b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
  a = tmpNestedAssignPropRhs;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpNestedAssignComMemberProp$1 /*:unknown*/ = $(`c`);
      const tmpCompObj$1 /*:unknown*/ = $(b);
      const tmpCompProp$1 /*:unknown*/ = $(`d`);
      const tmpNestedAssignPropRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
      b[tmpNestedAssignComMemberProp$1] = tmpNestedAssignPropRhs$1;
      a = tmpNestedAssignPropRhs$1;
    } else {
      break;
    }
  }
} else {
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
const c = {
  c: 10,
  d: 20,
};
if (b) {
  const d = $( "c" );
  const e = $( c );
  const f = $( "d" );
  const g = e[ f ];
  c[d] = g;
  a = g;
  while ($LOOP_UNROLL_10) {
    const h = $( 1 );
    if (h) {
      const i = $( "c" );
      const j = $( c );
      const k = $( "d" );
      const l = j[ k ];
      c[i] = l;
      a = l;
    }
    else {
      break;
    }
  }
}
$( a, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 1
 - 6: 'c'
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 1
 - 10: 'c'
 - 11: { c: '20', d: '20' }
 - 12: 'd'
 - 13: 1
 - 14: 'c'
 - 15: { c: '20', d: '20' }
 - 16: 'd'
 - 17: 1
 - 18: 'c'
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 1
 - 22: 'c'
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 1
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
