# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Statement > Do while > Auto ident delete prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (delete ($(1), $(2), $(arg)).y);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if (delete ($(1), $(2), $(arg)).y) {
  } else {
    break;
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  const tmpIfTest = delete tmpDeleteObj.y;
  if (tmpIfTest) {
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
$(100);
$(1);
$(2);
const tmpDeleteObj = $(arg);
const tmpIfTest = delete tmpDeleteObj.y;
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    $(1);
    $(2);
    const tmpDeleteObj$1 = $(arg);
    const tmpIfTest$1 = delete tmpDeleteObj$1.y;
    if (tmpIfTest$1) {
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
  b: 1000,
};
$( 100 );
$( 1 );
$( 2 );
const c = $( a );
const d = delete c.y;
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    $( 1 );
    $( 2 );
    const e = $( a );
    const f = delete e.y;
    if (f) {

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
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: 100
 - 6: 1
 - 7: 2
 - 8: {}
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: {}
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: {}
 - 17: 100
 - 18: 1
 - 19: 2
 - 20: {}
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: {}
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
