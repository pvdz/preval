# Preval test case

# auto_ident_call_complex.md

> normalize > expressions > statement > logic_or_both > auto_ident_call_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($)(1) || $($)(1);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $($);
const tmpIfTest = tmpCallCallee(1);
if (tmpIfTest) {
} else {
  const tmpCallCallee$1 = $($);
  tmpCallCallee$1(1);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $($);
const tmpIfTest = tmpCallCallee(1);
if (tmpIfTest) {
} else {
  const tmpCallCallee$1 = $($);
  tmpCallCallee$1(1);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
