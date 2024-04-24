# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident cond c-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100))));
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
    tmpDoWhileFlag = a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
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
    let tmpNestedComplexRhs = undefined;
    const tmpIfTest = $(30);
    if (tmpIfTest) {
      tmpNestedComplexRhs = $(60);
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
    }
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
let tmpNestedComplexRhs = undefined;
const tmpIfTest = $(30);
let tmpSSA_a = undefined;
if (tmpIfTest) {
  tmpNestedComplexRhs = $(60);
  tmpSSA_a = tmpNestedComplexRhs;
} else {
  const tmpCalleeParam = $(100);
  tmpNestedComplexRhs = $(tmpCalleeParam);
  tmpSSA_a = tmpNestedComplexRhs;
}
let tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(100);
  let tmpNestedComplexRhs$1 = undefined;
  const tmpIfTest$1 = $(30);
  if (tmpIfTest$1) {
    tmpNestedComplexRhs$1 = $(60);
  } else {
    const tmpCalleeParam$1 = $(100);
    tmpNestedComplexRhs$1 = $(tmpCalleeParam$1);
  }
  tmpSSA_a = tmpNestedComplexRhs$1;
  tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      let tmpNestedComplexRhs$2 = undefined;
      const tmpIfTest$2 = $(30);
      if (tmpIfTest$2) {
        tmpNestedComplexRhs$2 = $(60);
      } else {
        const tmpCalleeParam$2 = $(100);
        tmpNestedComplexRhs$2 = $(tmpCalleeParam$2);
      }
      tmpSSA_a = tmpNestedComplexRhs$2;
      tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs$2;
    } else {
      break;
    }
  }
} else {
}
$(tmpSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
let a = undefined;
const b = $( 30 );
let c = undefined;
if (b) {
  a = $( 60 );
  c = a;
}
else {
  const d = $( 100 );
  a = $( d );
  c = a;
}
let e = a;
if (a) {
  $( 100 );
  let f = undefined;
  const g = $( 30 );
  if (g) {
    f = $( 60 );
  }
  else {
    const h = $( 100 );
    f = $( h );
  }
  c = f;
  e = f;
  while ($LOOP_UNROLL_9) {
    if (e) {
      $( 100 );
      let i = undefined;
      const j = $( 30 );
      if (j) {
        i = $( 60 );
      }
      else {
        const k = $( 100 );
        i = $( k );
      }
      c = i;
      e = i;
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
 - 1: 100
 - 2: 30
 - 3: 60
 - 4: 100
 - 5: 30
 - 6: 60
 - 7: 100
 - 8: 30
 - 9: 60
 - 10: 100
 - 11: 30
 - 12: 60
 - 13: 100
 - 14: 30
 - 15: 60
 - 16: 100
 - 17: 30
 - 18: 60
 - 19: 100
 - 20: 30
 - 21: 60
 - 22: 100
 - 23: 30
 - 24: 60
 - 25: 100
 - 26: 30
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
