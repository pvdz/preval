# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > For c > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); { x: $(1), y: 2, z: $(3) });
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    ({ x: $(1), y: 2, z: $(3) });
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    $(1);
    $(3);
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let tmpIfTest = $(1);
if (tmpIfTest) {
  $(1);
  $(3);
  tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      $(1);
      $(3);
      tmpIfTest = $(1);
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 1 );
if (a) {
  $( 1 );
  $( 3 );
  a = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (a) {
      $( 1 );
      $( 3 );
      a = $( 1 );
    }
    else {
      break;
    }
  }
}
const b = {
a: 999,
b: 1000
;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 3
 - 4: 1
 - 5: 1
 - 6: 3
 - 7: 1
 - 8: 1
 - 9: 3
 - 10: 1
 - 11: 1
 - 12: 3
 - 13: 1
 - 14: 1
 - 15: 3
 - 16: 1
 - 17: 1
 - 18: 3
 - 19: 1
 - 20: 1
 - 21: 3
 - 22: 1
 - 23: 1
 - 24: 3
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
