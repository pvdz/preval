# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((10, 20, $(30)) ? $(2) : $($(100)));
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
    tmpDoWhileFlag = (10, 20, $(30)) ? $(2) : $($(100));
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
      tmpDoWhileFlag = $(2);
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
let $tmpLoopUnrollCheck = false;
if (tmpIfTest) {
  tmpDoWhileFlag = $(2);
  $tmpLoopUnrollCheck = tmpDoWhileFlag;
} else {
  const tmpCalleeParam = $(100);
  tmpDoWhileFlag = $(tmpCalleeParam);
  $tmpLoopUnrollCheck = tmpDoWhileFlag;
}
if (tmpDoWhileFlag) {
  $(100);
  const tmpIfTest$1 = $(30);
  if (tmpIfTest$1) {
    tmpDoWhileFlag = $(2);
  } else {
    const tmpCalleeParam$1 = $(100);
    tmpDoWhileFlag = $(tmpCalleeParam$1);
  }
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      const tmpIfTest$2 = $(30);
      if (tmpIfTest$2) {
        tmpDoWhileFlag = $(2);
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
let c = false;
if (b) {
  a = $( 2 );
  c = a;
}
else {
  const d = $( 100 );
  a = $( d );
  c = a;
}
if (a) {
  $( 100 );
  const e = $( 30 );
  if (e) {
    a = $( 2 );
  }
  else {
    const f = $( 100 );
    a = $( f );
  }
}
if (c) {
  while ($LOOP_UNROLL_9) {
    if (a) {
      $( 100 );
      const g = $( 30 );
      if (g) {
        a = $( 2 );
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
 - 3: 2
 - 4: 100
 - 5: 30
 - 6: 2
 - 7: 100
 - 8: 30
 - 9: 2
 - 10: 100
 - 11: 30
 - 12: 2
 - 13: 100
 - 14: 30
 - 15: 2
 - 16: 100
 - 17: 30
 - 18: 2
 - 19: 100
 - 20: 30
 - 21: 2
 - 22: 100
 - 23: 30
 - 24: 2
 - 25: 100
 - 26: 30
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
