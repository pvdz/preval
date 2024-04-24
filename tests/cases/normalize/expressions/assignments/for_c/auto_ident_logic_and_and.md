# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > For c > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = $($(1)) && $($(1)) && $($(2)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = $($(1)) && $($(1)) && $($(2));
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
    const tmpCalleeParam = $(1);
    a = tmpCallCallee(tmpCalleeParam);
    if (a) {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      a = tmpCallCallee$1(tmpCalleeParam$1);
      if (a) {
        const tmpCallCallee$3 = $;
        const tmpCalleeParam$3 = $(2);
        a = tmpCallCallee$3(tmpCalleeParam$3);
      } else {
      }
    } else {
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
  const tmpCalleeParam = $(1);
  a = $(tmpCalleeParam);
  if (a) {
    const tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
      const tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
    } else {
    }
  } else {
  }
  tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpCalleeParam$2 = $(1);
      a = $(tmpCalleeParam$2);
      if (a) {
        const tmpCalleeParam$4 = $(1);
        a = $(tmpCalleeParam$4);
        if (a) {
          const tmpCalleeParam$6 = $(2);
          a = $(tmpCalleeParam$6);
        } else {
        }
      } else {
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
  const c = $( 1 );
  a = $( c );
  if (a) {
    const d = $( 1 );
    a = $( d );
    if (a) {
      const e = $( 2 );
      a = $( e );
    }
  }
  b = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (b) {
      const f = $( 1 );
      a = $( f );
      if (a) {
        const g = $( 1 );
        a = $( g );
        if (a) {
          const h = $( 2 );
          a = $( h );
        }
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
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: 2
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 2
 - 21: 2
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
