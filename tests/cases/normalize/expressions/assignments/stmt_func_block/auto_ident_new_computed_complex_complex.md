# Preval test case

# auto_ident_new_computed_complex_complex.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident new computed complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = { a: 999, b: 1000 };
    a = new ($(b)[$("$")])(1);
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
    let a = { a: 999, b: 1000 };
    a = new ($(b)[$('$')])(1);
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpCompObj = $(b);
  const tmpCompProp = $('$');
  const tmpNewCallee = tmpCompObj[tmpCompProp];
  a = new tmpNewCallee(1);
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
  const tmpCompObj = $(b);
  const tmpCompProp = $('$');
  const tmpNewCallee = tmpCompObj[tmpCompProp];
  const SSA_a = new tmpNewCallee(1);
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
 - 4: {}
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
