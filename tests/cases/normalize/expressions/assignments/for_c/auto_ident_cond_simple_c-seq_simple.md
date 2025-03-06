# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> Normalize > Expressions > Assignments > For c > Auto ident cond simple c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = 1 ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = 1 ? (40, 50, $(60)) : $($(100));
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    a = $(60);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    a = $(60);
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
if (b) {
  while ($LOOP_UNROLL_10) {
    a = $( 60 );
    const c = $( 1 );
    if (c) {

    }
    else {
      break;
    }
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 1
 - 4: 60
 - 5: 1
 - 6: 60
 - 7: 1
 - 8: 60
 - 9: 1
 - 10: 60
 - 11: 1
 - 12: 60
 - 13: 1
 - 14: 60
 - 15: 1
 - 16: 60
 - 17: 1
 - 18: 60
 - 19: 1
 - 20: 60
 - 21: 1
 - 22: 60
 - 23: 1
 - 24: 60
 - 25: 1
 - 26: 60
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- objects in isFree check