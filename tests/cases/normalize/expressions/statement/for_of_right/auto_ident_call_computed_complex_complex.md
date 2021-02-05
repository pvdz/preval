# Preval test case

# auto_ident_call_computed_complex_complex.md

> normalize > expressions > statement > for_of_right > auto_ident_call_computed_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (let x of $(b)[$("$")](1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  const tmpForOfDeclRhs = tmpCallCompObj[tmpCallCompProp](1);
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
const tmpForOfDeclRhs = tmpCallCompObj[tmpCallCompProp](1);
let x;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
