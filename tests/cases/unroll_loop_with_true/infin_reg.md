# Preval test case

# infin_reg.md

> Unroll loop with true > Infin reg
>
> This regression was infinitely looping
>
> This starts as `for (let i=-1; i>-5; ++i) $(i);`

## Input

`````js filename=intro
$(-1);
$(0);
$(1);
$(2);
let i = 3;
let tst = true;
while (tst) {
  $(i);
  i = i + 1;
  tst = i > -5;
}
`````

## Pre Normal

`````js filename=intro
$(-1);
$(0);
$(1);
$(2);
let i = 3;
let tst = true;
while (tst) {
  $(i);
  i = i + 1;
  tst = i > -5;
}
`````

## Normalized

`````js filename=intro
$(-1);
$(0);
$(1);
$(2);
let i = 3;
let tst = true;
while (tst) {
  $(i);
  i = i + 1;
  tst = i > -5;
}
`````

## Output

`````js filename=intro
$(-1);
$(0);
$(1);
$(2);
$(3);
$(4);
let tmpClusterSSA_i$1 = 5;
let tmpClusterSSA_tst$1 = true;
while (tmpClusterSSA_tst$1) {
  $(tmpClusterSSA_i$1);
  tmpClusterSSA_i$1 = tmpClusterSSA_i$1 + 1;
  tmpClusterSSA_tst$1 = tmpClusterSSA_i$1 > -5;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -1
 - 2: 0
 - 3: 1
 - 4: 2
 - 5: 3
 - 6: 4
 - 7: 5
 - 8: 6
 - 9: 7
 - 10: 8
 - 11: 9
 - 12: 10
 - 13: 11
 - 14: 12
 - 15: 13
 - 16: 14
 - 17: 15
 - 18: 16
 - 19: 17
 - 20: 18
 - 21: 19
 - 22: 20
 - 23: 21
 - 24: 22
 - 25: 23
 - 26: 24
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
