# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > For c > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); $(1) ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    $(1) ? (40, 50, $(60)) : $($(100));
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      $(60);
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      tmpCallCallee(tmpCalleeParam);
    }
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    $(60);
  } else {
    const tmpCalleeParam = $(100);
    $(tmpCalleeParam);
  }
  let tmpClusterSSA_tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpIfTest$2 = $(1);
      if (tmpIfTest$2) {
        $(60);
      } else {
        const tmpCalleeParam$1 = $(100);
        $(tmpCalleeParam$1);
      }
      tmpClusterSSA_tmpIfTest = $(1);
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
const a = $( 1 );
if (a) {
  const b = $( 1 );
  if (b) {
    $( 60 );
  }
  else {
    const c = $( 100 );
    $( c );
  }
  let d = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (d) {
      const e = $( 1 );
      if (e) {
        $( 60 );
      }
      else {
        const f = $( 100 );
        $( f );
      }
      d = $( 1 );
    }
    else {
      break;
    }
  }
}
const g = {
a: 999,
b: 1000
;
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 60
 - 4: 1
 - 5: 1
 - 6: 60
 - 7: 1
 - 8: 1
 - 9: 60
 - 10: 1
 - 11: 1
 - 12: 60
 - 13: 1
 - 14: 1
 - 15: 60
 - 16: 1
 - 17: 1
 - 18: 60
 - 19: 1
 - 20: 1
 - 21: 60
 - 22: 1
 - 23: 1
 - 24: 60
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
