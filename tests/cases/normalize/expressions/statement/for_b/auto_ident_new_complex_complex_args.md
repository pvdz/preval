# Preval test case

# auto_ident_new_complex_complex_args.md

> normalize > expressions > statement > for_b > auto_ident_new_complex_complex_args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; new ($($))($(1), $(2)); $(1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpNewCallee = $($);
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = $(2);
    const tmpIfTest = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
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
({ $: $ });
let a = { a: 999, b: 1000 };
while (true) {
  const tmpNewCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  const tmpIfTest = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 1
 - 6: '<$>'
 - 7: 1
 - 8: 2
 - 9: 1, 2
 - 10: 1
 - 11: '<$>'
 - 12: 1
 - 13: 2
 - 14: 1, 2
 - 15: 1
 - 16: '<$>'
 - 17: 1
 - 18: 2
 - 19: 1, 2
 - 20: 1
 - 21: '<$>'
 - 22: 1
 - 23: 2
 - 24: 1, 2
 - 25: 1
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
