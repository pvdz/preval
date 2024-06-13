# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Statement > Do while > Auto ident c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (($(1), $(2), $(x)));
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if (($(1), $(2), $(x))) {
  } else {
    break;
  }
}
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  $(1);
  $(2);
  const tmpIfTest = $(x);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, x);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
$(100);
$(1);
$(2);
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    $(1);
    $(2);
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
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
$( 100 );
$( 1 );
$( 2 );
const b = $( 1 );
if (b) {

}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    $( 1 );
    $( 2 );
    const c = $( 1 );
    if (c) {

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
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 2
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 100
 - 18: 1
 - 19: 2
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
