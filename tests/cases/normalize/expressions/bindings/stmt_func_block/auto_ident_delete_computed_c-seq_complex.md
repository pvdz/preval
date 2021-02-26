# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident delete computed c-seq complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let arg = { y: 1 };

    let a = delete ($(1), $(2), $(arg))[$("y")];
    $(a, arg);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let arg = { y: 1 };
  $(1);
  $(2);
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $('y');
  let a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  $(a, arg);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const arg = { y: 1 };
  $(1);
  $(2);
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $('y');
  const a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  $(a, arg);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'y'
 - 5: true, {}
 - 6: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
