# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Return > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return ($($(1)) && $($(1))) || $($(2));
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
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpReturnArg = tmpCallCallee$1(tmpCalleeParam$1);
  }
  if (tmpReturnArg) {
  } else {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    tmpReturnArg = tmpCallCallee$2(tmpCalleeParam$2);
  }
  return tmpReturnArg;
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCalleeParam = $(1);
  let tmpReturnArg = $(tmpCalleeParam);
  if (tmpReturnArg) {
    const tmpCalleeParam$1 = $(1);
    tmpReturnArg = $(tmpCalleeParam$1);
  }
  if (tmpReturnArg) {
  } else {
    const tmpCalleeParam$2 = $(2);
    tmpReturnArg = $(tmpCalleeParam$2);
  }
  return tmpReturnArg;
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
