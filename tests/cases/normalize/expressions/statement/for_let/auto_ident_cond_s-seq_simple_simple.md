# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Statement > For let > Auto ident cond s-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (10, 20, 30) ? $(2) : $($(100)); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = (10, 20, 30) ? $(2) : $($(100));
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
let xyz = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  xyz = $(2);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  xyz = tmpCallCallee(tmpCalleeParam);
}
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const SSA_xyz = $(2);
while (true) {
  $(SSA_xyz);
  $(1);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 2
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 2
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 2
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 2
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 2
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
