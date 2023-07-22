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
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = (10, 20, $(30)) ? (40, 50, 60) : $($(100));
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
    const tmpIfTest = $(30);
    if (tmpIfTest) {
      tmpDoWhileFlag = 60;
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      tmpDoWhileFlag = tmpCallCallee(tmpCalleeParam);
    }
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let tmpDoWhileFlag = true;
$(100);
const tmpIfTest = $(30);
if (tmpIfTest) {
} else {
  const tmpCalleeParam = $(100);
  tmpDoWhileFlag = $(tmpCalleeParam);
}
let $tmpLoopUnrollCheck = true;
if (tmpDoWhileFlag) {
  $(100);
  const tmpIfTest$1 = $(30);
  if (tmpIfTest$1) {
    tmpDoWhileFlag = true;
  } else {
    const tmpCalleeParam$1 = $(100);
    tmpDoWhileFlag = $(tmpCalleeParam$1);
  }
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      const tmpIfTest$2 = $(30);
      if (tmpIfTest$2) {
        tmpDoWhileFlag = true;
      } else {
        const tmpCalleeParam$2 = $(100);
        tmpDoWhileFlag = $(tmpCalleeParam$2);
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
let a = true;
$( 100 );
const b = $( 30 );
if (b) {

}
else {
  const c = $( 100 );
  a = $( c );
}
let d = true;
if (a) {
  $( 100 );
  const e = $( 30 );
  if (e) {
    a = true;
  }
  else {
    const f = $( 100 );
    a = $( f );
  }
}
else {
  d = false;
}
if (d) {
  while ($LOOP_UNROLL_9) {
    if (a) {
      $( 100 );
      const g = $( 30 );
      if (g) {
        a = true;
      }
      else {
        const h = $( 100 );
        a = $( h );
      }
    }
    else {
      break;
    }
  }
}
const i = {
a: 999,
b: 1000
;
$( i );
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
