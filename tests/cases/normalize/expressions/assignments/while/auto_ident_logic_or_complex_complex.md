# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > While > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $($(0)) || $($(2)))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $($(0)) || $($(2)))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    a = tmpCallCallee$1(tmpCalleeParam$1);
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
let $tmpLoopUnrollCheck = true;
const tmpCalleeParam = $(0);
let a = $(tmpCalleeParam);
if (a) {
} else {
  const tmpCalleeParam$1 = $(2);
  a = $(tmpCalleeParam$1);
}
if (a) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpCalleeParam$2 = $(0);
    a = $(tmpCalleeParam$2);
    if (a) {
    } else {
      const tmpCalleeParam$4 = $(2);
      a = $(tmpCalleeParam$4);
    }
    if (a) {
      $(100);
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
let a = true;
const b = $( 0 );
let c = $( b );
if (c) {

}
else {
  const d = $( 2 );
  c = $( d );
}
if (c) {
  $( 100 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const e = $( 0 );
    c = $( e );
    if (c) {

    }
    else {
      const f = $( 2 );
      c = $( f );
    }
    if (c) {
      $( 100 );
    }
    else {
      break;
    }
  }
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 100
 - 6: 0
 - 7: 0
 - 8: 2
 - 9: 2
 - 10: 100
 - 11: 0
 - 12: 0
 - 13: 2
 - 14: 2
 - 15: 100
 - 16: 0
 - 17: 0
 - 18: 2
 - 19: 2
 - 20: 100
 - 21: 0
 - 22: 0
 - 23: 2
 - 24: 2
 - 25: 100
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
