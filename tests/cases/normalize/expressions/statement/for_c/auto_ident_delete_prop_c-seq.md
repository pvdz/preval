# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Statement > For c > Auto ident delete prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); delete ($(1), $(2), $(arg)).y);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    delete ($(1), $(2), $(arg)).y;
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
    $(1);
    $(2);
    const tmpDeleteObj = $(arg);
    delete tmpDeleteObj.y;
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  delete tmpDeleteObj.y;
  tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      $(1);
      $(2);
      const tmpDeleteObj$1 = $(arg);
      delete tmpDeleteObj$1.y;
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
const a = { y: 1 };
const b = {
a: 999,
b: 1000
;
let c = $( 1 );
if (c) {
  $( 1 );
  $( 2 );
  const d = $( a );
  deleted.y;
  c = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (c) {
      $( 1 );
      $( 2 );
      const e = $( a );
      deletee.y;
      c = $( 1 );
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
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: {}
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: {}
 - 13: 1
 - 14: 1
 - 15: 2
 - 16: {}
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: {}
 - 21: 1
 - 22: 1
 - 23: 2
 - 24: {}
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
