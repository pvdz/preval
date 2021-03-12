# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Statement > Ternary b > Auto ident call complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(1) ? $($)($(1), $(2)) : $(200);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$(1) ? $($)($(1), $(2)) : $(200);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCallCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
} else {
  $(200);
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCallCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
} else {
  $(200);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
