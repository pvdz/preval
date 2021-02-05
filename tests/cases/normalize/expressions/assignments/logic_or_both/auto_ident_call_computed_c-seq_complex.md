# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> normalize > expressions > assignments > logic_or_both > auto_ident_call_computed_c-seq_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))[$("$")](1)) || (a = (1, 2, $(b))[$("$")](1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
1;
2;
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
} else {
  1;
  2;
  const tmpCallCompObj$1 = $(b);
  const tmpCallCompProp$1 = $('$');
  const tmpNestedComplexRhs$1 = tmpCallCompObj$1[tmpCallCompProp$1](1);
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
} else {
  const tmpCallCompObj$1 = $(b);
  const tmpCallCompProp$1 = $('$');
  const tmpNestedComplexRhs$1 = tmpCallCompObj$1[tmpCallCompProp$1](1);
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
