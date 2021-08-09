# Preval test case

# break_last.md

> Unwind loops > Break last
>
> Unrolling loops

#TODO

## Input

`````js filename=intro
for (let i=0; i<10; ++i) $(i);
`````

## Pre Normal

`````js filename=intro
{
  let i = 0;
  while (i < 10) {
    $(i);
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
  i = i + 1;
  tmpIfTest = i < 10;
}
`````

## Output

`````js filename=intro
$(0);
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
$(7);
$(8);
$(9);
let tmpClusterSSA_i$17 = 10;
let tmpClusterSSA_tmpIfTest$17 = false;
while (tmpClusterSSA_tmpIfTest$17) {
  $(tmpClusterSSA_i$17);
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
 - 4: 3
 - 5: 4
 - 6: 5
 - 7: 6
 - 8: 7
 - 9: 8
 - 10: 9
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same