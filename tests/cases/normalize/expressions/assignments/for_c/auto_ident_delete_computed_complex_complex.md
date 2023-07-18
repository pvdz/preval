# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident delete computed complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = delete $(arg)[$("y")]);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = delete $(arg)[$(`y`)];
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpDeleteCompObj = $(arg);
    const tmpDeleteCompProp = $(`y`);
    a = delete tmpDeleteCompObj[tmpDeleteCompProp];
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
let $tmpLoopUnrollCheck = true;
const arg = { y: 1 };
if (tmpIfTest) {
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  tmpIfTest = $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpDeleteCompObj$1 = $(arg);
      const tmpDeleteCompProp$1 = $(`y`);
      a = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
      tmpIfTest = $(1);
    } else {
      break;
    }
  }
} else {
}
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
let b = $( 1 );
let c = true;
const d = { y: 1 };
if (b) {
  const e = $( d );
  const f = $( "y" );
  a = deletee[ f ];
  b = $( 1 );
}
else {
  c = false;
}
if (c) {
  while ($LOOP_UNROLL_10) {
    if (b) {
      const g = $( d );
      const h = $( "y" );
      a = deleteg[ h ];
      b = $( 1 );
    }
    else {
      break;
    }
  }
}
$( a, d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { y: '1' }
 - 3: 'y'
 - 4: 1
 - 5: {}
 - 6: 'y'
 - 7: 1
 - 8: {}
 - 9: 'y'
 - 10: 1
 - 11: {}
 - 12: 'y'
 - 13: 1
 - 14: {}
 - 15: 'y'
 - 16: 1
 - 17: {}
 - 18: 'y'
 - 19: 1
 - 20: {}
 - 21: 'y'
 - 22: 1
 - 23: {}
 - 24: 'y'
 - 25: 1
 - 26: {}
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
