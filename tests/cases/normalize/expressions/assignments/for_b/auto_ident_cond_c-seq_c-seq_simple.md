# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> normalize > expressions > assignments > for_b > auto_ident_cond_c-seq_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100))); $(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest$1 = $(30);
    if (tmpIfTest$1) {
      a = $(60);
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      a = tmpCallCallee(tmpCalleeParam);
    }
    let tmpIfTest = a;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest$1 = $(30);
    if (tmpIfTest$1) {
      a = $(60);
    } else {
      const tmpCalleeParam = $(100);
      a = $(tmpCalleeParam);
    }
    let tmpIfTest = a;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: 1
 - 4: 30
 - 5: 60
 - 6: 1
 - 7: 30
 - 8: 60
 - 9: 1
 - 10: 30
 - 11: 60
 - 12: 1
 - 13: 30
 - 14: 60
 - 15: 1
 - 16: 30
 - 17: 60
 - 18: 1
 - 19: 30
 - 20: 60
 - 21: 1
 - 22: 30
 - 23: 60
 - 24: 1
 - 25: 30
 - 26: 60
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same