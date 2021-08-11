# Preval test case

# 0_10_1_const_expr.md

> Unwind loops > Separate test > 0 10 1 const expr
>
> Unrolling loops

#TODO

## Input

`````js filename=intro
for (let i=0; i<10; ++i) {
 const x = i * 2;
  $(x);
}
`````

## Pre Normal

`````js filename=intro
{
  let i = 0;
  while (i < 10) {
    {
      const x = i * 2;
      $(x);
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
  const x = i * 2;
  $(x);
  i = i + 1;
  tmpIfTest = i < 10;
}
`````

## Output

`````js filename=intro
$(0);
$(2);
$(4);
$(6);
$(8);
$(10);
$(12);
$(14);
$(16);
$(18);
let tmpClusterSSA_i$17 = 10;
let tmpClusterSSA_tmpIfTest$17 = false;
while (tmpClusterSSA_tmpIfTest$17) {
  const x = tmpClusterSSA_i$17 * 2;
  $(x);
  tmpClusterSSA_i$17 = tmpClusterSSA_i$17 + 1;
  tmpClusterSSA_tmpIfTest$17 = tmpClusterSSA_i$17 < 10;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 2
 - 3: 4
 - 4: 6
 - 5: 8
 - 6: 10
 - 7: 12
 - 8: 14
 - 9: 16
 - 10: 18
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
