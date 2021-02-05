# Preval test case

# auto_ident_call_complex_complex_args.md

> normalize > expressions > assignments > while > auto_ident_call_complex_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = $($)($(1), $(2)))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
  const tmpCallCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  const tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  a = tmpNestedComplexRhs;
  tmpIfTest = tmpNestedComplexRhs;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
({ $: $ });
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
  const tmpCallCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  const tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  a = tmpNestedComplexRhs;
  tmpIfTest = tmpNestedComplexRhs;
  if (tmpIfTest) {
    $(100);
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
 - 5: 100
 - 6: '<$>'
 - 7: 1
 - 8: 2
 - 9: 1, 2
 - 10: 100
 - 11: '<$>'
 - 12: 1
 - 13: 2
 - 14: 1, 2
 - 15: 100
 - 16: '<$>'
 - 17: 1
 - 18: 2
 - 19: 1, 2
 - 20: 100
 - 21: '<$>'
 - 22: 1
 - 23: 2
 - 24: 1, 2
 - 25: 100
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
