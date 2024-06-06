# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Assignments > While > Auto ident cond complex simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $(1) ? 2 : $($(100)))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $(1) ? 2 : $($(100)))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    a = 2;
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    a = tmpCallCallee(tmpCalleeParam);
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let a = 2;
let $tmpLoopUnrollCheck = true;
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  $(100);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
  if (a) {
    $(100);
  } else {
    $tmpLoopUnrollCheck = false;
  }
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 = $(1);
    if (tmpIfTest$2) {
      $(100);
    } else {
      const tmpCalleeParam$1 = $(100);
      a = $(tmpCalleeParam$1);
      if (a) {
        $(100);
      } else {
        break;
      }
    }
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 2;
let b = true;
const c = $( 1 );
if (c) {
  $( 100 );
}
else {
  const d = $( 100 );
  a = $( d );
  if (a) {
    $( 100 );
  }
  else {
    b = false;
  }
}
if (b) {
  while ($LOOP_UNROLL_10) {
    const e = $( 1 );
    if (e) {
      $( 100 );
    }
    else {
      const f = $( 100 );
      a = $( f );
      if (a) {
        $( 100 );
      }
      else {
        break;
      }
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
 - 2: 100
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 100
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 100
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
