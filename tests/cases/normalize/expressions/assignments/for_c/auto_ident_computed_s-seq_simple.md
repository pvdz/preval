# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > For c > Auto ident computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = (1, 2, b)[$("c")]);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = (1, 2, b)[$(`c`)];
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpAssignRhsCompObj = b;
    const tmpAssignRhsCompProp = $(`c`);
    a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 1 };
const a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpAssignRhsCompProp = $(`c`);
  b[tmpAssignRhsCompProp];
  let tmpClusterSSA_tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpAssignRhsCompProp$1 = $(`c`);
      b[tmpAssignRhsCompProp$1];
      tmpClusterSSA_tmpIfTest = $(1);
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
const a = { c: 1 };
const b = {
  a: 999,
  b: 1000,
};
const c = $( 1 );
if (c) {
  const d = $( "c" );
  a[ d ];
  let e = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (e) {
      const f = $( "c" );
      a[ f ];
      e = $( 1 );
    }
    else {
      break;
    }
  }
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'c'
 - 3: 1
 - 4: 'c'
 - 5: 1
 - 6: 'c'
 - 7: 1
 - 8: 'c'
 - 9: 1
 - 10: 'c'
 - 11: 1
 - 12: 'c'
 - 13: 1
 - 14: 'c'
 - 15: 1
 - 16: 'c'
 - 17: 1
 - 18: 'c'
 - 19: 1
 - 20: 'c'
 - 21: 1
 - 22: 'c'
 - 23: 1
 - 24: 'c'
 - 25: 1
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
