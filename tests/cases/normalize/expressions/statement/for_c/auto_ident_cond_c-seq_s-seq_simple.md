# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> normalize > expressions > statement > for_c > auto_ident_cond_c-seq_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); (10, 20, $(30)) ? (40, 50, 60) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpIfTest$1 = $(30);
      if (tmpIfTest$1) {
      } else {
        const tmpCallCallee = $;
        const tmpCalleeParam = $(100);
        tmpCallCallee(tmpCalleeParam);
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
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(30);
    if (tmpIfTest$1) {
    } else {
      const tmpCalleeParam = $(100);
      $(tmpCalleeParam);
    }
  } else {
    break;
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 30
 - 3: 1
 - 4: 30
 - 5: 1
 - 6: 30
 - 7: 1
 - 8: 30
 - 9: 1
 - 10: 30
 - 11: 1
 - 12: 30
 - 13: 1
 - 14: 30
 - 15: 1
 - 16: 30
 - 17: 1
 - 18: 30
 - 19: 1
 - 20: 30
 - 21: 1
 - 22: 30
 - 23: 1
 - 24: 30
 - 25: 1
 - 26: 30
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
