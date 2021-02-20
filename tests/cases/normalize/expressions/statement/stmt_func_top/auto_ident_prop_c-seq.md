# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: 1 };

  let a = { a: 999, b: 1000 };
  (1, 2, $(b)).c;
  $(a, b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { c: 1 };
  let a = { a: 999, b: 1000 };
  const tmpCompObj = $(b);
  tmpCompObj.c;
  $(a, b);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const b = { c: 1 };
  const a = { a: 999, b: 1000 };
  const tmpCompObj = $(b);
  tmpCompObj.c;
  $(a, b);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
