# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > For let > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (10, 20, $(30)) ? $(2) : $($(100)); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = (10, 20, $(30)) ? $(2) : $($(100));
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
const tmpIfTest = $(30);
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
let xyz = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  xyz = $(2);
} else {
  const tmpCalleeParam = $(100);
  xyz = $(tmpCalleeParam);
}
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: 2
 - 4: 1
 - 5: 2
 - 6: 1
 - 7: 2
 - 8: 1
 - 9: 2
 - 10: 1
 - 11: 2
 - 12: 1
 - 13: 2
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 2
 - 18: 1
 - 19: 2
 - 20: 1
 - 21: 2
 - 22: 1
 - 23: 2
 - 24: 1
 - 25: 2
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
