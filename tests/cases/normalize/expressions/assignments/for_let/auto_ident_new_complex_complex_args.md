# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > For let > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (let xyz = (a = new ($($))($(1), $(2))); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  let xyz = (a = new ($($))($(1), $(2)));
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
while (true) {
  $(a);
  $(1);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: {}
 - 6: 1
 - 7: {}
 - 8: 1
 - 9: {}
 - 10: 1
 - 11: {}
 - 12: 1
 - 13: {}
 - 14: 1
 - 15: {}
 - 16: 1
 - 17: {}
 - 18: 1
 - 19: {}
 - 20: 1
 - 21: {}
 - 22: 1
 - 23: {}
 - 24: 1
 - 25: {}
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
