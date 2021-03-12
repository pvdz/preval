# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident new ident complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ((a = new $($(1), $(2)))) {
  default:
    $(100);
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
a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
let tmpSwitchTest = a;
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  $(100);
}
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const SSA_a = new $(tmpCalleeParam, tmpCalleeParam$1);
$(100);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 100
 - 5: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
