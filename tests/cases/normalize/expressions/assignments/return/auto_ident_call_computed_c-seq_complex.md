# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> normalize > expressions > assignments > return > auto_ident_call_computed_c-seq_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return (a = (1, 2, $(b))[$("$")](1));
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg;
  1;
  2;
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let b = { $: $ };
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
function f() {
  let tmpReturnArg;
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
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
