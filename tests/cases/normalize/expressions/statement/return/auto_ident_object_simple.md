# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Statement > Return > Auto ident object simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return { x: 1, y: 2, z: 3 };
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpReturnArg = { x: 1, y: 2, z: 3 };
  return tmpReturnArg;
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpReturnArg = { x: 1, y: 2, z: 3 };
  return tmpReturnArg;
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
