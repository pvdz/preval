# Preval test case

# auto_ident_bin.md

> normalize > expressions > statement > return > auto_ident_bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $(1) + $(2);
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpBinBothLhs = $(1);
  const tmpBinBothRhs = $(2);
  const tmpReturnArg = tmpBinBothLhs + tmpBinBothRhs;
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
function f() {
  const tmpBinBothLhs = $(1);
  const tmpBinBothRhs = $(2);
  const tmpReturnArg = tmpBinBothLhs + tmpBinBothRhs;
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
