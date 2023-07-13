# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Do while > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(1)) && $($(1)) && $($(2)));
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
    tmpDoWhileFlag = $($(1)) && $($(1)) && $($(2));
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
    const tmpCalleeParam = $(1);
    tmpDoWhileFlag = tmpCallCallee(tmpCalleeParam);
    if (tmpDoWhileFlag) {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      tmpDoWhileFlag = tmpCallCallee$1(tmpCalleeParam$1);
      if (tmpDoWhileFlag) {
        const tmpCallCallee$3 = $;
        const tmpCalleeParam$3 = $(2);
        tmpDoWhileFlag = tmpCallCallee$3(tmpCalleeParam$3);
      } else {
      }
    } else {
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
const tmpCalleeParam = $(1);
const tmpDoWhileFlag = $(tmpCalleeParam);
if (tmpDoWhileFlag) {
  const tmpCalleeParam$1 = $(1);
  const tmpClusterSSA_tmpDoWhileFlag$1 = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpDoWhileFlag$1) {
    const tmpCalleeParam$3 = $(2);
    const tmpClusterSSA_tmpDoWhileFlag$3 = $(tmpCalleeParam$3);
    if (tmpClusterSSA_tmpDoWhileFlag$3) {
      $(100);
      const tmpCalleeParam$2 = $(1);
      let tmpClusterSSA_tmpDoWhileFlag = $(tmpCalleeParam$2);
      if (tmpClusterSSA_tmpDoWhileFlag) {
        const tmpCalleeParam$4 = $(1);
        tmpClusterSSA_tmpDoWhileFlag = $(tmpCalleeParam$4);
        if (tmpClusterSSA_tmpDoWhileFlag) {
          const tmpCalleeParam$6 = $(2);
          tmpClusterSSA_tmpDoWhileFlag = $(tmpCalleeParam$6);
        } else {
        }
      } else {
      }
      while ($LOOP_UNROLL_9) {
        if (tmpClusterSSA_tmpDoWhileFlag) {
          $(100);
          const tmpCalleeParam$5 = $(1);
          tmpClusterSSA_tmpDoWhileFlag = $(tmpCalleeParam$5);
          if (tmpClusterSSA_tmpDoWhileFlag) {
            const tmpCalleeParam$7 = $(1);
            tmpClusterSSA_tmpDoWhileFlag = $(tmpCalleeParam$7);
            if (tmpClusterSSA_tmpDoWhileFlag) {
              const tmpCalleeParam$9 = $(2);
              tmpClusterSSA_tmpDoWhileFlag = $(tmpCalleeParam$9);
            } else {
            }
          } else {
          }
        } else {
          break;
        }
      }
    } else {
    }
  } else {
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
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
 - 6: 2
 - 7: 2
 - 8: 100
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: 2
 - 15: 100
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 2
 - 21: 2
 - 22: 100
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
