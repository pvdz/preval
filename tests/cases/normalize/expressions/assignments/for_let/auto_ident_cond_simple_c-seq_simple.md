# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> Normalize > Expressions > Assignments > For let > Auto ident cond simple c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = 1 ? (40, 50, $(60)) : $($(100))); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = (a = 1 ? (40, 50, $(60)) : $($(100)));
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = $(60);
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const a = $(60);
while (true) {
  $(a);
  $(1);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - 2: 60
 - 3: 1
 - 4: 60
 - 5: 1
 - 6: 60
 - 7: 1
 - 8: 60
 - 9: 1
 - 10: 60
 - 11: 1
 - 12: 60
 - 13: 1
 - 14: 60
 - 15: 1
 - 16: 60
 - 17: 1
 - 18: 60
 - 19: 1
 - 20: 60
 - 21: 1
 - 22: 60
 - 23: 1
 - 24: 60
 - 25: 1
 - 26: 60
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
