# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Return > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $($(0)) || ($($(1)) && $($(2)));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return $($(0)) || ($($(1)) && $($(2)));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  if (tmpReturnArg) {
    return tmpReturnArg;
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpReturnArg = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpReturnArg) {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(2);
      tmpReturnArg = tmpCallCallee$2(tmpCalleeParam$2);
      return tmpReturnArg;
    } else {
      return tmpReturnArg;
    }
  }
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
  const tmpCalleeParam = $(0);
  const tmpReturnArg = $(tmpCalleeParam);
  if (tmpReturnArg) {
    return tmpReturnArg;
  } else {
    const tmpCalleeParam$1 = $(1);
    let SSA_tmpReturnArg = $(tmpCalleeParam$1);
    if (SSA_tmpReturnArg) {
      const tmpCalleeParam$2 = $(2);
      SSA_tmpReturnArg = $(tmpCalleeParam$2);
      return SSA_tmpReturnArg;
    } else {
      return SSA_tmpReturnArg;
    }
  }
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
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
