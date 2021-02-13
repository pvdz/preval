# Preval test case

# auto_ident_delete_prop_s-seq.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_delete_prop_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let arg = { y: 1 };

    let a = { a: 999, b: 1000 };
    a = delete ($(1), $(2), arg).y;
    $(a, x);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let arg = { y: 1 };
    let a = { a: 999, b: 1000 };
    $(1);
    $(2);
    const tmpDeleteObj = arg;
    a = delete tmpDeleteObj.y;
    $(a, x);
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
    let arg = { y: 1 };
    let a = { a: 999, b: 1000 };
    $(1);
    $(2);
    const tmpDeleteObj = arg;
    a = delete tmpDeleteObj.y;
    $(a, x);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: true, undefined
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same