# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> normalize > expressions > assignments > for_c > auto_ident_cond_complex_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = $(1) ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpIfTest$1 = $(1);
      if (tmpIfTest$1) {
        a = $(60);
      } else {
        const tmpCallCallee = $;
        const tmpCalleeParam = $(100);
        a = tmpCallCallee(tmpCalleeParam);
      }
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
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpIfTest$1 = $(1);
      if (tmpIfTest$1) {
        a = $(60);
      } else {
        const tmpCalleeParam = $(100);
        a = $(tmpCalleeParam);
      }
    } else {
      break;
    }
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 60
 - 4: 1
 - 5: 1
 - 6: 60
 - 7: 1
 - 8: 1
 - 9: 60
 - 10: 1
 - 11: 1
 - 12: 60
 - 13: 1
 - 14: 1
 - 15: 60
 - 16: 1
 - 17: 1
 - 18: 60
 - 19: 1
 - 20: 1
 - 21: 60
 - 22: 1
 - 23: 1
 - 24: 60
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
