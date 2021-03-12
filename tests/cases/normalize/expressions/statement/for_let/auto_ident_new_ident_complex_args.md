# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Statement > For let > Auto ident new ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (let xyz = new $($(1), $(2)); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
{
  let xyz = new $($(1), $(2));
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
const tmpNewCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
let xyz = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const xyz = new $(tmpCalleeParam, tmpCalleeParam$1);
while (true) {
  $(xyz);
  $(1);
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
 - 4: {}
 - 5: 1
 - 6: {}
 - 7: 1
 - 8: {}
 - 9: 1
 - 10: {}
 - 11: 1
 - 12: {}
 - 13: 1
 - 14: {}
 - 15: 1
 - 16: {}
 - 17: 1
 - 18: {}
 - 19: 1
 - 20: {}
 - 21: 1
 - 22: {}
 - 23: 1
 - 24: {}
 - 25: 1
 - 26: {}
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
