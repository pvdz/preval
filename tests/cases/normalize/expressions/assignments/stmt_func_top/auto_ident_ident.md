# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = 1;

  let a = { a: 999, b: 1000 };
  a = b;
  $(a, b);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = 1;
  let a = { a: 999, b: 1000 };
  a = b;
  $(a, b);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  $(1, 1);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
