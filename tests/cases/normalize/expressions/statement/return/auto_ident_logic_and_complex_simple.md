# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Statement > Return > Auto ident logic and complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $($(1)) && 2;
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  if (tmpReturnArg) {
    tmpReturnArg = 2;
    return tmpReturnArg;
  } else {
    return tmpReturnArg;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCalleeParam = $(1);
  let tmpReturnArg = $(tmpCalleeParam);
  if (tmpReturnArg) {
    tmpReturnArg = 2;
    return tmpReturnArg;
  } else {
    return tmpReturnArg;
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
