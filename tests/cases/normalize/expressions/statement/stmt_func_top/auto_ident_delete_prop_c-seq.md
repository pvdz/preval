# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident delete prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let arg = { y: 1 };

  let a = { a: 999, b: 1000 };
  delete ($(1), $(2), $(arg)).y;
  $(a, arg);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let arg = { y: 1 };
  let a = { a: 999, b: 1000 };
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  delete tmpDeleteObj.y;
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
  const a = { a: 999, b: 1000 };
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  delete tmpDeleteObj.y;
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
 - 4: { a: '999', b: '1000' }, {}
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
