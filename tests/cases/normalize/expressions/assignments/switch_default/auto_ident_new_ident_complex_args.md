# Preval test case

# auto_ident_new_ident_complex_args.md

> normalize > expressions > assignments > switch_default > auto_ident_new_ident_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = new $($(1), $(2));
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  const tmpNewCallee = $;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
}
$(a);
`````

## Output

`````js filename=intro
$(1);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const SSA_a = new $(tmpCalleeParam, tmpCalleeParam$1);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
