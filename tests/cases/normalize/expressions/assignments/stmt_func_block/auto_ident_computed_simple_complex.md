# Preval test case

# auto_ident_computed_simple_complex.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 1 };

    let a = { a: 999, b: 1000 };
    a = b[$("c")];
    $(a, b);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let b = { c: 1 };
    let a = { a: 999, b: 1000 };
    const tmpAssignRhsCompObj = b;
    const tmpAssignRhsCompProp = $('c');
    a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
    $(a, b);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  {
    let b = { c: 1 };
    let a = { a: 999, b: 1000 };
    const tmpAssignRhsCompObj = b;
    const tmpAssignRhsCompProp = $('c');
    a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
    $(a, b);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'c'
 - 2: 1, { c: '1' }
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same