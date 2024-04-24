# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > For c > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = $($(0)) || 2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = $($(0)) || 2;
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
    const tmpCallCallee = $;
    const tmpCalleeParam = $(0);
    a = tmpCallCallee(tmpCalleeParam);
    if (a) {
    } else {
      a = 2;
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
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  if (a) {
  } else {
    a = 2;
  }
  tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpCalleeParam$1 = $(0);
      a = $(tmpCalleeParam$1);
      if (a) {
      } else {
        a = 2;
      }
      tmpIfTest = $(1);
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
let b = $( 1 );
if (b) {
  const c = $( 0 );
  a = $( c );
  if (a) {

  }
  else {
    a = 2;
  }
  b = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (b) {
      const d = $( 0 );
      a = $( d );
      if (a) {

      }
      else {
        a = 2;
      }
      b = $( 1 );
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
 - 1: 1
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 0
 - 6: 0
 - 7: 1
 - 8: 0
 - 9: 0
 - 10: 1
 - 11: 0
 - 12: 0
 - 13: 1
 - 14: 0
 - 15: 0
 - 16: 1
 - 17: 0
 - 18: 0
 - 19: 1
 - 20: 0
 - 21: 0
 - 22: 1
 - 23: 0
 - 24: 0
 - 25: 1
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
