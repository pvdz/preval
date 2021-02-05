# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> normalize > expressions > assignments > for_in_right > auto_ident_call_computed_c-seq_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (let x in (a = (1, 2, $(b))[$("$")](1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  let tmpForInDeclRhs;
  1;
  2;
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
  a = tmpNestedComplexRhs;
  tmpForInDeclRhs = tmpNestedComplexRhs;
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpForInDeclRhs;
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
a = tmpNestedComplexRhs;
tmpForInDeclRhs = tmpNestedComplexRhs;
let x;
for (x in tmpForInDeclRhs) {
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

Final output calls: Same
