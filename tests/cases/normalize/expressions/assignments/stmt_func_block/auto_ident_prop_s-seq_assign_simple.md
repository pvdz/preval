# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_prop_s-seq_assign_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 1 };

    let a = { a: 999, b: 1000 };
    a = (1, 2, b).c = 2;
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
    const tmpNestedAssignObj = b;
    const tmpNestedPropAssignRhs = 2;
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
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
    const tmpNestedAssignObj = b;
    tmpNestedAssignObj.c = 2;
    a = 2;
    $(a, b);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 2, { c: '2' }
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same