# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> normalize > expressions > statement > for_let > auto_ident_cond_complex_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = $(1) ? (40, 50, 60) : $($(100)); ; $(1)) $(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    xyz = 60;
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    xyz = tmpCallCallee(tmpCalleeParam);
  }
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    xyz = 60;
  } else {
    const tmpCalleeParam = $(100);
    xyz = $(tmpCalleeParam);
  }
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
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

Normalized calls: Same

Final output calls: Same
