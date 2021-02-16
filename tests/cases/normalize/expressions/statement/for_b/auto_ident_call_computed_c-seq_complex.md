# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> normalize > expressions > statement > for_b > auto_ident_call_computed_c-seq_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; (1, 2, $(b))[$("$")](1); $(1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpCallCompObj = $(b);
    const tmpCallCompProp = $('$');
    const tmpIfTest = tmpCallCompObj[tmpCallCompProp](1);
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
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  const tmpIfTest = tmpCallCompObj[tmpCallCompProp](1);
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
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: { $: '"<$>"' }
 - 6: '$'
 - 7: 1
 - 8: 1
 - 9: { $: '"<$>"' }
 - 10: '$'
 - 11: 1
 - 12: 1
 - 13: { $: '"<$>"' }
 - 14: '$'
 - 15: 1
 - 16: 1
 - 17: { $: '"<$>"' }
 - 18: '$'
 - 19: 1
 - 20: 1
 - 21: { $: '"<$>"' }
 - 22: '$'
 - 23: 1
 - 24: 1
 - 25: { $: '"<$>"' }
 - 26: '$'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
