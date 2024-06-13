# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Statement > For b > Auto ident c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (; $(1), $(2), $(x); $(1));
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  while (($(1), $(2), $(x))) {
    $(1);
  }
}
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while (true) {
  $(1);
  $(2);
  const tmpIfTest = $(x);
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, x);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
$(1);
$(2);
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(1);
    $(2);
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      $(1);
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
$( 1 );
$( 2 );
const b = $( 1 );
if (b) {
  $( 1 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    $( 2 );
    const c = $( 1 );
    if (c) {
      $( 1 );
    }
    else {
      break;
    }
  }
}
const d = {
  a: 999,
  b: 1000,
};
$( d, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
