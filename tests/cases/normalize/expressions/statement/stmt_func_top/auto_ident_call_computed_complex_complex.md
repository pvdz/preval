# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident call computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = { a: 999, b: 1000 };
  $(b)[$("$")](1);
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  tmpCallCompObj[tmpCallCompProp](1);
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const b = { $: $ };
  const a = { a: 999, b: 1000 };
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  tmpCallCompObj[tmpCallCompProp](1);
  $(a);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
