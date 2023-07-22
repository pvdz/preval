# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Do while > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(0)) || $($(1)) || $($(2)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = $($(0)) || $($(1)) || $($(2));
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpCallCallee = $;
    const tmpCalleeParam = $(0);
    tmpDoWhileFlag = tmpCallCallee(tmpCalleeParam);
    if (tmpDoWhileFlag) {
    } else {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      tmpDoWhileFlag = tmpCallCallee$1(tmpCalleeParam$1);
      if (tmpDoWhileFlag) {
      } else {
        const tmpCallCallee$3 = $;
        const tmpCalleeParam$3 = $(2);
        tmpDoWhileFlag = tmpCallCallee$3(tmpCalleeParam$3);
      }
    }
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
const tmpCalleeParam = $(0);
let tmpDoWhileFlag = $(tmpCalleeParam);
if (tmpDoWhileFlag) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpDoWhileFlag = $(tmpCalleeParam$1);
  if (tmpDoWhileFlag) {
  } else {
    const tmpCalleeParam$3 = $(2);
    tmpDoWhileFlag = $(tmpCalleeParam$3);
  }
}
let $tmpLoopUnrollCheck = true;
if (tmpDoWhileFlag) {
  $(100);
  const tmpCalleeParam$2 = $(0);
  tmpDoWhileFlag = $(tmpCalleeParam$2);
  if (tmpDoWhileFlag) {
  } else {
    const tmpCalleeParam$4 = $(1);
    tmpDoWhileFlag = $(tmpCalleeParam$4);
    if (tmpDoWhileFlag) {
    } else {
      const tmpCalleeParam$6 = $(2);
      tmpDoWhileFlag = $(tmpCalleeParam$6);
    }
  }
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      const tmpCalleeParam$5 = $(0);
      tmpDoWhileFlag = $(tmpCalleeParam$5);
      if (tmpDoWhileFlag) {
      } else {
        const tmpCalleeParam$7 = $(1);
        tmpDoWhileFlag = $(tmpCalleeParam$7);
        if (tmpDoWhileFlag) {
        } else {
          const tmpCalleeParam$9 = $(2);
          tmpDoWhileFlag = $(tmpCalleeParam$9);
        }
      }
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
$( 100 );
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {

  }
  else {
    const d = $( 2 );
    b = $( d );
  }
}
let e = true;
if (b) {
  $( 100 );
  const f = $( 0 );
  b = $( f );
  if (b) {

  }
  else {
    const g = $( 1 );
    b = $( g );
    if (b) {

    }
    else {
      const h = $( 2 );
      b = $( h );
    }
  }
}
else {
  e = false;
}
if (e) {
  while ($LOOP_UNROLL_9) {
    if (b) {
      $( 100 );
      const i = $( 0 );
      b = $( i );
      if (b) {

      }
      else {
        const j = $( 1 );
        b = $( j );
        if (b) {

        }
        else {
          const k = $( 2 );
          b = $( k );
        }
      }
    }
    else {
      break;
    }
  }
}
const l = {
a: 999,
b: 1000
;
$( l );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 100
 - 7: 0
 - 8: 0
 - 9: 1
 - 10: 1
 - 11: 100
 - 12: 0
 - 13: 0
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: 0
 - 18: 0
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: 0
 - 23: 0
 - 24: 1
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
