# Preval test case

# auto_ident_delete_computed_simple_simple.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_delete_computed_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let arg = { y: 1 };

    let a = { a: 999, b: 1000 };
    a = delete arg["y"];
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
  a = delete arg['y'];
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
  const SSA_a = delete arg['y'];
  $(SSA_a, arg);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, {}
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
