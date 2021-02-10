# Preval test case

# auto_ident_new_complex_complex_args.md

> normalize > expressions > statement > for_c > auto_ident_new_complex_complex_args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); new ($($))($(1), $(2)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpNewCallee = $($);
      const tmpCalleeParam = $(1);
      const tmpCalleeParam$1 = $(2);
      new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
    } else {
      break;
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - 6: 1
 - 7: '<$>'
 - 8: 1
 - 9: 2
 - 10: 1, 2
 - 11: 1
 - 12: '<$>'
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 1
 - 17: '<$>'
 - 18: 1
 - 19: 2
 - 20: 1, 2
 - 21: 1
 - 22: '<$>'
 - 23: 1
 - 24: 2
 - 25: 1, 2
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
