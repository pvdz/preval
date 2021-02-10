# Preval test case

# auto_ident_cond_complex_simple_simple.md

> normalize > expressions > statement > return > auto_ident_cond_complex_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $(1) ? 2 : $($(100));
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    tmpReturnArg = 2;
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  }
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
