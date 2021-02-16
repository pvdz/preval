# Preval test case

# auto_ident_c-seq.md

> normalize > expressions > statement > stmt_func_block > auto_ident_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let x = 1;

    let a = { a: 999, b: 1000 };
    $(1), $(2), $(x);
    $(a, x);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let x = 1;
  let a = { a: 999, b: 1000 };
  $(1);
  $(2);
  $(x);
  $(a, x);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  $(1);
  $(2);
  $(1);
  $(a, 1);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: { a: '999', b: '1000' }, 1
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
