# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident call computed complex complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = $(b)[$("$")](1);
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let b = { $ };
    let a = $(b)[$('$')](1);
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { $: $ };
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  let a = tmpCallCompObj[tmpCallCompProp](1);
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
  const a = tmpCallCompObj[tmpCallCompProp](1);
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
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
