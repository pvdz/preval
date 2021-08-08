# Preval test case

# 0_10_1_multi.md

> Unwind loops > 0 10 1 multi
>
> Unrolling loops

#TODO

## Input

`````js filename=intro
for (let i=0; i<10; ++i) {
  $(i);
  $(i + 1);
  $(i + 2);
}
`````

## Pre Normal

`````js filename=intro
{
  let i = 0;
  while (i < 10) {
    {
      $(i);
      $(i + 1);
      $(i + 2);
    }
    ++i;
  }
}
`````

## Normalized

`````js filename=intro
let i = 0;
let tmpIfTest = i < 10;
while (tmpIfTest) {
  $(i);
  const tmpCallCallee = $;
  const tmpCalleeParam = i + 1;
  tmpCallCallee(tmpCalleeParam);
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = i + 2;
  tmpCallCallee$1(tmpCalleeParam$1);
  i = i + 1;
  tmpIfTest = i < 10;
}
`````

## Output

`````js filename=intro
$(0);
$(1);
$(2);
$(1);
$(2);
$(3);
$(2);
$(3);
$(4);
$(3);
$(4);
$(5);
$(4);
$(5);
$(6);
$(5);
$(6);
$(7);
$(6);
$(7);
$(8);
$(7);
$(8);
$(9);
$(8);
$(9);
$(10);
$(9);
$(10);
$(11);
let tmpClusterSSA_i$17 = 10;
let tmpClusterSSA_tmpIfTest$17 = false;
while (tmpClusterSSA_tmpIfTest$17) {
  $(tmpClusterSSA_i$17);
  const tmpCalleeParam = tmpClusterSSA_i$17 + 1;
  $(tmpCalleeParam);
  const tmpCalleeParam$1 = tmpClusterSSA_i$17 + 2;
  $(tmpCalleeParam$1);
  tmpClusterSSA_i$17 = tmpClusterSSA_i$17 + 1;
  tmpClusterSSA_tmpIfTest$17 = tmpClusterSSA_i$17 < 10;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 2
 - 6: 3
 - 7: 2
 - 8: 3
 - 9: 4
 - 10: 3
 - 11: 4
 - 12: 5
 - 13: 4
 - 14: 5
 - 15: 6
 - 16: 5
 - 17: 6
 - 18: 7
 - 19: 6
 - 20: 7
 - 21: 8
 - 22: 7
 - 23: 8
 - 24: 9
 - 25: 8
 - 26: 9
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
