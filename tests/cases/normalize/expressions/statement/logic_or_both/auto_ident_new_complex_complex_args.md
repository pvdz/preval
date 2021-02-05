# Preval test case

# auto_ident_new_complex_complex_args.md

> normalize > expressions > statement > logic_or_both > auto_ident_new_complex_complex_args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new ($($))($(1), $(2)) || new ($($))($(1), $(2));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpIfTest = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
if (tmpIfTest) {
} else {
  const tmpNewCallee$1 = $($);
  const tmpCalleeParam$2 = $(1);
  const tmpCalleeParam$3 = $(2);
  new tmpNewCallee$1(tmpCalleeParam$2, tmpCalleeParam$3);
}
$(a);
`````

## Output

`````js filename=intro
({ $: $ });
let a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpIfTest = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
if (tmpIfTest) {
} else {
  const tmpNewCallee$1 = $($);
  const tmpCalleeParam$2 = $(1);
  const tmpCalleeParam$3 = $(2);
  new tmpNewCallee$1(tmpCalleeParam$2, tmpCalleeParam$3);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
