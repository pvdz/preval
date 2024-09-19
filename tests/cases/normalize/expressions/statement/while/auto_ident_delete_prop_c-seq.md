# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Statement > While > Auto ident delete prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
while (delete ($(1), $(2), $(arg)).y) $(100);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (delete ($(1), $(2), $(arg)).y) $(100);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  const tmpIfTest = delete tmpDeleteObj.y;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, arg);
`````

## Output


`````js filename=intro
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj = $(arg);
const tmpIfTest /*:boolean*/ = delete tmpDeleteObj.y;
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    $(1);
    $(2);
    const tmpDeleteObj$1 = $(arg);
    const tmpIfTest$1 /*:boolean*/ = delete tmpDeleteObj$1.y;
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    $( 1 );
    $( 2 );
    const d = $( a );
    const e = delete d.y;
    if (e) {

    }
    else {
      break;
    }
  }
}
const f = {
  a: 999,
  b: 1000,
};
$( f, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: {}
 - 8: 100
 - 9: 1
 - 10: 2
 - 11: {}
 - 12: 100
 - 13: 1
 - 14: 2
 - 15: {}
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: {}
 - 20: 100
 - 21: 1
 - 22: 2
 - 23: {}
 - 24: 100
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
