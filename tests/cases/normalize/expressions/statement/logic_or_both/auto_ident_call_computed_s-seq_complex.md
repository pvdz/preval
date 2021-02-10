# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> normalize > expressions > statement > logic_or_both > auto_ident_call_computed_s-seq_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
(1, 2, b)[$("$")](1) || (1, 2, b)[$("$")](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = b;
const tmpCallCompProp = $('$');
const tmpIfTest = tmpCallCompObj[tmpCallCompProp](1);
if (tmpIfTest) {
} else {
  const tmpCallCompObj$1 = b;
  const tmpCallCompProp$1 = $('$');
  tmpCallCompObj$1[tmpCallCompProp$1](1);
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
