# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > statement > stmt_func_block > auto_ident_prop_s-seq_assign_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 1 };

    let a = { a: 999, b: 1000 };
    (1, 2, b).c = 2;
    $(a, b);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { c: 1 };
  let a = { a: 999, b: 1000 };
  const tmpAssignMemLhsObj = b;
  tmpAssignMemLhsObj.c = 2;
  $(a, b);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let b = { c: 1 };
  let a = { a: 999, b: 1000 };
  b.c = 2;
  $(a, b);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, { c: '2' }
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
