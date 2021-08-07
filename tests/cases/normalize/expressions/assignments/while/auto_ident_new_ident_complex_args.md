# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Assignments > While > Auto ident new ident complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = new $($(1), $(2)))) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while ((a = new $($(1), $(2)))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpNewCallee = $;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  let tmpIfTest = a;
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
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  a = new $(tmpCalleeParam, tmpCalleeParam$1);
  $(100);
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
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: 1, 2
 - 8: 100
 - 9: 1
 - 10: 2
 - 11: 1, 2
 - 12: 100
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: 1, 2
 - 20: 100
 - 21: 1
 - 22: 2
 - 23: 1, 2
 - 24: 100
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
