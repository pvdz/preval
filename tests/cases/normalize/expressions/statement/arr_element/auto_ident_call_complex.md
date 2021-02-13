# Preval test case

# auto_ident_call_complex.md

> normalize > expressions > statement > arr_element > auto_ident_call_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($)(1) + $($)(1);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $($);
tmpCallCallee(1);
const tmpCallCallee$1 = $($);
tmpCallCallee$1(1);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $($);
tmpCallCallee(1);
const tmpCallCallee$1 = $($);
tmpCallCallee$1(1);
$(a);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same