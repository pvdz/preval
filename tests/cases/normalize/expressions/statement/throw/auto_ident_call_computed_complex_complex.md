# Preval test case

# auto_ident_call_computed_complex_complex.md

> normalize > expressions > statement > throw > auto_ident_call_computed_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
throw $(b)[$("$")](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
let tmpThrowArg = tmpCallCompObj[tmpCallCompProp](1);
throw tmpThrowArg;
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
