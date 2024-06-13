# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident cond c-seq s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((10, 20, $(30)) ? (40, 50, 60) : $($(100)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((10, 20, $(30)) ? (40, 50, 60) : $($(100))) {
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
  let tmpIfTest = undefined;
  const tmpIfTest$1 = $(30);
  if (tmpIfTest$1) {
    tmpIfTest = 60;
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpIfTest = tmpCallCallee(tmpCalleeParam);
  }
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
$(100);
let tmpIfTest = true;
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam = $(100);
  tmpIfTest = $(tmpCalleeParam);
}
if (tmpIfTest) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    let tmpIfTest$2 = true;
    const tmpIfTest$4 = $(30);
    if (tmpIfTest$4) {
    } else {
      const tmpCalleeParam$1 = $(100);
      tmpIfTest$2 = $(tmpCalleeParam$1);
    }
    if (tmpIfTest$2) {
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
$( 100 );
let b = true;
const c = $( 30 );
if (c) {

}
else {
  const d = $( 100 );
  b = $( d );
}
if (b) {

}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    let e = true;
    const f = $( 30 );
    if (f) {

    }
    else {
      const g = $( 100 );
      e = $( g );
    }
    if (e) {

    }
    else {
      break;
    }
  }
}
const h = {
  a: 999,
  b: 1000,
};
$( h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 30
 - 3: 100
 - 4: 30
 - 5: 100
 - 6: 30
 - 7: 100
 - 8: 30
 - 9: 100
 - 10: 30
 - 11: 100
 - 12: 30
 - 13: 100
 - 14: 30
 - 15: 100
 - 16: 30
 - 17: 100
 - 18: 30
 - 19: 100
 - 20: 30
 - 21: 100
 - 22: 30
 - 23: 100
 - 24: 30
 - 25: 100
 - 26: 30
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
