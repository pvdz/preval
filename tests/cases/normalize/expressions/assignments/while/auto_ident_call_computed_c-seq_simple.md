# Preval test case

# auto_ident_call_computed_c-seq_simple.md

> normalize > expressions > assignments > while > auto_ident_call_computed_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = (1, 2, $(b))["$"](1))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
  1;
  2;
  const tmpCallObj = $(b);
  const tmpNestedComplexRhs = tmpCallObj['$'](1);
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
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
  const tmpCallObj = $(b);
  const tmpNestedComplexRhs = tmpCallObj.$(1);
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
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 100
 - 4: { $: '"<$>"' }
 - 5: 1
 - 6: 100
 - 7: { $: '"<$>"' }
 - 8: 1
 - 9: 100
 - 10: { $: '"<$>"' }
 - 11: 1
 - 12: 100
 - 13: { $: '"<$>"' }
 - 14: 1
 - 15: 100
 - 16: { $: '"<$>"' }
 - 17: 1
 - 18: 100
 - 19: { $: '"<$>"' }
 - 20: 1
 - 21: 100
 - 22: { $: '"<$>"' }
 - 23: 1
 - 24: 100
 - 25: { $: '"<$>"' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
