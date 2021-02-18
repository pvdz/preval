# Preval test case

# auto_ident_delete_computed_simple_complex.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_delete_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let arg = { y: 1 };

    let a = { a: 999, b: 1000 };
    a = delete arg[$("y")];
    $(a, arg);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let arg = { y: 1 };
  let a = { a: 999, b: 1000 };
  const tmpDeleteCompObj = arg;
  const tmpDeleteCompProp = $('y');
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  $(a, arg);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const arg = { y: 1 };
  const tmpDeleteCompProp = $('y');
  const SSA_a = delete arg[tmpDeleteCompProp];
  $(SSA_a, arg);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - 2: true, {}
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
