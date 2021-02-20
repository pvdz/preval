# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident call computed complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = { a: 999, b: 1000 };
  a = $(b)[$("$")](1);
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  a = tmpCallCompObj[tmpCallCompProp](1);
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const b = { $: $ };
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  const SSA_a = tmpCallCompObj[tmpCallCompProp](1);
  $(SSA_a);
}
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
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
