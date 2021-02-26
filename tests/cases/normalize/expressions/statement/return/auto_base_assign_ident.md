# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Return > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (b = $(2));
}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
let f = function () {
  b = $(2);
  let tmpReturnArg = b;
  return tmpReturnArg;
};
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const f = function () {
  b = $(2);
  const tmpReturnArg = b;
  return tmpReturnArg;
};
let b = 1;
const a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
