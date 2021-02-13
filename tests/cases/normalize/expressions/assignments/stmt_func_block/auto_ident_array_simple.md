# Preval test case

# auto_ident_array_simple.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_array_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = [1, 2, 3];
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = [1, 2, 3];
    $(a);
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
    let a = { a: 999, b: 1000 };
    a = [1, 2, 3];
    $(a);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same