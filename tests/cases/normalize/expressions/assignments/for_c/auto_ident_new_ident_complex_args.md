# Preval test case

# auto_ident_new_ident_complex_args.md

> normalize > expressions > assignments > for_c > auto_ident_new_ident_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); a = new $($(1), $(2)));
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
      const tmpNewCallee = $;
      const tmpCalleeParam = $(1);
      const tmpCalleeParam$1 = $(2);
      a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
    } else {
      break;
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpCalleeParam = $(1);
      const tmpCalleeParam$1 = $(2);
      a = new $(tmpCalleeParam, tmpCalleeParam$1);
    } else {
      break;
    }
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 1, 2
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: 1, 2
 - 13: 1
 - 14: 1
 - 15: 2
 - 16: 1, 2
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: 1, 2
 - 21: 1
 - 22: 1
 - 23: 2
 - 24: 1, 2
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same