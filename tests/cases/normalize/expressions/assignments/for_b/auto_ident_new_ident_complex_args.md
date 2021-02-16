# Preval test case

# auto_ident_new_ident_complex_args.md

> normalize > expressions > assignments > for_b > auto_ident_new_ident_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; (a = new $($(1), $(2))); $(1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpNewCallee = $;
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = $(2);
    a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
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
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  a = new $(tmpCalleeParam, tmpCalleeParam$1);
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
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
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 1, 2
 - 8: 1
 - 9: 1
 - 10: 2
 - 11: 1, 2
 - 12: 1
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 1
 - 17: 1
 - 18: 2
 - 19: 1, 2
 - 20: 1
 - 21: 1
 - 22: 2
 - 23: 1, 2
 - 24: 1
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
