# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > While > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($(0)) || 2) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($(0)) || 2) $(100);
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
    tmpIfTest = 2;
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
  tmpIfTest = true;
}
if (tmpIfTest) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpCalleeParam$1 = $(0);
    let tmpIfTest$1 = $(tmpCalleeParam$1);
    if (tmpIfTest$1) {
    } else {
      tmpIfTest$1 = true;
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
  c = true;
}
if (c) {
  $( 100 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const d = $( 0 );
    let e = $( d );
    if (e) {

    }
    else {
      e = true;
    }
    if (e) {
      $( 100 );
    }
    else {
      break;
    }
  }
}
const f = {
a: 999,
b: 1000
;
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 100
 - 4: 0
 - 5: 0
 - 6: 100
 - 7: 0
 - 8: 0
 - 9: 100
 - 10: 0
 - 11: 0
 - 12: 100
 - 13: 0
 - 14: 0
 - 15: 100
 - 16: 0
 - 17: 0
 - 18: 100
 - 19: 0
 - 20: 0
 - 21: 100
 - 22: 0
 - 23: 0
 - 24: 100
 - 25: 0
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
