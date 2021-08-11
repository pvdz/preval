# Preval test case

# 0_5_1_rev_gte.md

> Unwind loops > Separate test > 0 5 1 rev gte
>
> Unrolling loops

#TODO

## Input

`````js filename=intro
for (let i=0; 5>=i; ++i) $(i);
`````

## Pre Normal

`````js filename=intro
{
  let i = 0;
  while (5 >= i) {
    $(i);
    ++i;
  }
}
`````

## Normalized

`````js filename=intro
let i = 0;
let tmpIfTest = 5 >= i;
while (tmpIfTest) {
  $(i);
  i = i + 1;
  tmpIfTest = 5 >= i;
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
