# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident cond complex c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(1) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = $(1) ? (40, 50, $(60)) : $($(100)))) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    a = $(60);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    a = tmpCallCallee(tmpCalleeParam);
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
let $tmpLoopUnrollCheck = true;
$(100);
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  a = $(60);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
if (a) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpIfTest$2 = $(1);
    if (tmpIfTest$2) {
      a = $(60);
    } else {
      const tmpCalleeParam$1 = $(100);
      a = $(tmpCalleeParam$1);
    }
    if (a) {
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
b: 1000
;
let b = true;
$( 100 );
const c = $( 1 );
if (c) {
  a = $( 60 );
}
else {
  const d = $( 100 );
  a = $( d );
}
if (a) {

}
else {
  b = false;
}
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const e = $( 1 );
    if (e) {
      a = $( 60 );
    }
    else {
      const f = $( 100 );
      a = $( f );
    }
    if (a) {

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
 - 1: 100
 - 2: 1
 - 3: 60
 - 4: 100
 - 5: 1
 - 6: 60
 - 7: 100
 - 8: 1
 - 9: 60
 - 10: 100
 - 11: 1
 - 12: 60
 - 13: 100
 - 14: 1
 - 15: 60
 - 16: 100
 - 17: 1
 - 18: 60
 - 19: 100
 - 20: 1
 - 21: 60
 - 22: 100
 - 23: 1
 - 24: 60
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
