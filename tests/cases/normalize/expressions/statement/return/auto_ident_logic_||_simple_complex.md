# Preval test case

# auto_ident_logic_||_simple_complex.md

> Normalize > Expressions > Statement > Return > Auto ident logic || simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return 0 || $($(1));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return 0 || $($(1));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  let tmpReturnArg = 0;
  if (tmpReturnArg) {
    return tmpReturnArg;
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    tmpReturnArg = tmpCallCallee(tmpCalleeParam);
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
  const SSA_tmpReturnArg = $(tmpCalleeParam);
  return SSA_tmpReturnArg;
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
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
