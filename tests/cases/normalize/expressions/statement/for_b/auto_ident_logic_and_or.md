# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > For b > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; ($($(1)) && $($(1))) || $($(2)); $(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (($($(1)) && $($(1))) || $($(2))) {
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
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
  }
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let $tmpLoopUnrollCheck = true;
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
  tmpIfTest = $(tmpCalleeParam$3);
}
if (tmpIfTest) {
  $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
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
      tmpIfTest$1 = $(tmpCalleeParam$6);
    }
    if (tmpIfTest$1) {
      $(1);
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
  c = $( e );
}
if (c) {
  $( 1 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    let g = $( f );
    if (g) {
      const h = $( 1 );
      g = $( h );
    }
    if (g) {

    }
    else {
      const i = $( 2 );
      g = $( i );
    }
    if (g) {
      $( 1 );
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
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
