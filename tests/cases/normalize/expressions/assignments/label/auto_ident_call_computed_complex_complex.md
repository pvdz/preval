# Preval test case

# auto_ident_call_computed_complex_complex.md

> normalize > expressions > assignments > label > auto_ident_call_computed_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
label: a = $(b)[$("$")](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
label: {
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  a = tmpCallCompObj[tmpCallCompProp](1);
}
$(a);
`````

## Output

`````js filename=intro
({ $: $ });
let a = { a: 999, b: 1000 };
label: {
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  a = tmpCallCompObj[tmpCallCompProp](1);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 2
 - 2: '$'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')
