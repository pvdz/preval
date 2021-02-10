# Preval test case

# auto_ident_new_prop_complex.md

> normalize > expressions > statement > return > auto_ident_new_prop_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return new ($(b).$)(1);
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  const tmpReturnArg = new tmpNewCallee(1);
  return tmpReturnArg;
}
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: {}
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
