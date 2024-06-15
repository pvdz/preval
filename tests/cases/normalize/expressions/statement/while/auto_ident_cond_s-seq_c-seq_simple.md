# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Statement > While > Auto ident cond s-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((10, 20, 30) ? (40, 50, $(60)) : $($(100))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ((10, 20, 30) ? (40, 50, $(60)) : $($(100))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpIfTest$1 = 30;
  if (tmpIfTest$1) {
    tmpIfTest = $(60);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpIfTest = tmpCallCallee(tmpCalleeParam);
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
const tmpClusterSSA_tmpIfTest = $(60);
if (tmpClusterSSA_tmpIfTest) {
  $(100);
  while ($LOOP_UNROLL_10) {
    const tmpClusterSSA_tmpIfTest$1 = $(60);
    if (tmpClusterSSA_tmpIfTest$1) {
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
const a = $( 60 );
if (a) {
  $( 100 );
  while ($LOOP_UNROLL_10) {
    const b = $( 60 );
    if (b) {
      $( 100 );
    }
    else {
      break;
    }
  }
}
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - 2: 100
 - 3: 60
 - 4: 100
 - 5: 60
 - 6: 100
 - 7: 60
 - 8: 100
 - 9: 60
 - 10: 100
 - 11: 60
 - 12: 100
 - 13: 60
 - 14: 100
 - 15: 60
 - 16: 100
 - 17: 60
 - 18: 100
 - 19: 60
 - 20: 100
 - 21: 60
 - 22: 100
 - 23: 60
 - 24: 100
 - 25: 60
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
