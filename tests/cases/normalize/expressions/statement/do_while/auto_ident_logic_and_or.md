# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Do while > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while (($($(1)) && $($(1))) || $($(2)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if (($($(1)) && $($(1))) || $($(2))) {
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
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
  }
  if (tmpIfTest) {
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpIfTest = tmpCallCallee$3(tmpCalleeParam$3);
    if (tmpIfTest) {
    } else {
      break;
    }
  }
}
$(a);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
$(100);
const tmpCalleeParam = $(1);
let tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 = $(1);
  tmpIfTest = $(tmpCalleeParam$1);
} else {
}
if (tmpIfTest) {
} else {
  const tmpCalleeParam$3 = $(2);
  const tmpClusterSSA_tmpIfTest = $(tmpCalleeParam$3);
  if (tmpClusterSSA_tmpIfTest) {
  } else {
    $tmpLoopUnrollCheck = false;
  }
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$2 = $(1);
    let tmpIfTest$1 = $(tmpCalleeParam$2);
    if (tmpIfTest$1) {
      const tmpCalleeParam$4 = $(1);
      tmpIfTest$1 = $(tmpCalleeParam$4);
    } else {
    }
    if (tmpIfTest$1) {
    } else {
      const tmpCalleeParam$6 = $(2);
      const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$6);
      if (tmpClusterSSA_tmpIfTest$1) {
      } else {
        break;
      }
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
const b = $( 1 );
let c = $( b );
if (c) {
  const d = $( 1 );
  c = $( d );
}
if (c) {

}
else {
  const e = $( 2 );
  const f = $( e );
  if (f) {

  }
  else {
    a = false;
  }
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const g = $( 1 );
    let h = $( g );
    if (h) {
      const i = $( 1 );
      h = $( i );
    }
    if (h) {

    }
    else {
      const j = $( 2 );
      const k = $( j );
      if (k) {

      }
      else {
        break;
      }
    }
  }
}
const l = {
  a: 999,
  b: 1000,
};
$( l );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
