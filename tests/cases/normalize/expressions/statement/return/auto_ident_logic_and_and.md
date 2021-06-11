# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Return > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $($(1)) && $($(1)) && $($(2));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $($(1)) && $($(1)) && $($(2));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  if (tmpReturnArg) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpReturnArg = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpReturnArg) {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      tmpReturnArg = tmpCallCallee$3(tmpCalleeParam$3);
      return tmpReturnArg;
    } else {
      return tmpReturnArg;
    }
  } else {
    return tmpReturnArg;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = f();
tmpCallCallee$5(tmpCalleeParam$5);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpCalleeParam = $(1);
  const tmpReturnArg = $(tmpCalleeParam);
  if (tmpReturnArg) {
    const tmpCalleeParam$1 = $(1);
    const tmpClusterSSA_tmpReturnArg = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpReturnArg) {
      const tmpCalleeParam$3 = $(2);
      const tmpClusterSSA_tmpReturnArg$1 = $(tmpCalleeParam$3);
      return tmpClusterSSA_tmpReturnArg$1;
    } else {
      return tmpClusterSSA_tmpReturnArg;
    }
  } else {
    return tmpReturnArg;
  }
};
const tmpCalleeParam$5 = f();
$(tmpCalleeParam$5);
const a = { a: 999, b: 1000 };
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
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
