# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident call computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = { a: 999, b: 1000 };
  a = (1, 2, $(b))[$("$")](1);
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = { $ };
  let a = { a: 999, b: 1000 };
  a = (1, 2, $(b))[$('$')](1);
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  a = tmpCallCompObj[tmpCallCompProp](1);
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
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  const SSA_a = tmpCallCompObj[tmpCallCompProp](1);
  $(SSA_a);
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
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
