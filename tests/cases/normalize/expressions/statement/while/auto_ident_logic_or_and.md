# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > While > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($(0)) || ($($(1)) && $($(2)))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($(0)) || ($($(1)) && $($(2)))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest) {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      tmpIfTest = tmpCallCallee$3(tmpCalleeParam$3);
    } else {
    }
  }
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
let $tmpLoopUnrollCheck = true;
const tmpCalleeParam = $(0);
let tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpIfTest = $(tmpCalleeParam$1);
  if (tmpIfTest) {
    const tmpCalleeParam$3 = $(2);
    tmpIfTest = $(tmpCalleeParam$3);
  } else {
  }
}
if (tmpIfTest) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpCalleeParam$2 = $(0);
    let tmpIfTest$1 = $(tmpCalleeParam$2);
    if (tmpIfTest$1) {
    } else {
      const tmpCalleeParam$4 = $(1);
      tmpIfTest$1 = $(tmpCalleeParam$4);
      if (tmpIfTest$1) {
        const tmpCalleeParam$6 = $(2);
        tmpIfTest$1 = $(tmpCalleeParam$6);
      } else {
      }
    }
    if (tmpIfTest$1) {
      $(100);
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
let a = true;
const b = $( 0 );
let c = $( b );
if (c) {

}
else {
  const d = $( 1 );
  c = $( d );
  if (c) {
    const e = $( 2 );
    c = $( e );
  }
}
if (c) {
  $( 100 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const f = $( 0 );
    let g = $( f );
    if (g) {

    }
    else {
      const h = $( 1 );
      g = $( h );
      if (g) {
        const i = $( 2 );
        g = $( i );
      }
    }
    if (g) {
      $( 100 );
    }
    else {
      break;
    }
  }
}
const j = {
a: 999,
b: 1000
;
$( j );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 100
 - 8: 0
 - 9: 0
 - 10: 1
 - 11: 1
 - 12: 2
 - 13: 2
 - 14: 100
 - 15: 0
 - 16: 0
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: 2
 - 21: 100
 - 22: 0
 - 23: 0
 - 24: 1
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
