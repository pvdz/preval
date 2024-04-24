# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > For c > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (; $(1); a = ($(1), $(2), $(x)));
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = ($(1), $(2), $(x));
  }
}
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    $(1);
    $(2);
    a = $(x);
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
if (tmpIfTest) {
  $(1);
  $(2);
  a = $(1);
  tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      $(1);
      $(2);
      a = $(1);
      tmpIfTest = $(1);
    } else {
      break;
    }
  }
} else {
}
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
let b = $( 1 );
if (b) {
  $( 1 );
  $( 2 );
  a = $( 1 );
  b = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (b) {
      $( 1 );
      $( 2 );
      a = $( 1 );
      b = $( 1 );
    }
    else {
      break;
    }
  }
}
$( a, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 2
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
