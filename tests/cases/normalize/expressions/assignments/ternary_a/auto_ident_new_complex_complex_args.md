# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new ($($))($(1), $(2))) ? $(100) : $(200));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$((a = new ($($))($(1), $(2))) ? $(100) : $(200));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpNewCallee = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
a = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpNewCallee = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
const SSA_a = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
if (SSA_a) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 100
 - 6: 100
 - 7: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
