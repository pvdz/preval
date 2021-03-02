# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > Return > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $(1) ? (40, 50, $(60)) : $($(100));
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  let tmpReturnArg = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    tmpReturnArg = $(60);
    return tmpReturnArg;
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
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
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const SSA_tmpReturnArg$1 = $(60);
    return SSA_tmpReturnArg$1;
  } else {
    const tmpCalleeParam = $(100);
    const SSA_tmpReturnArg = $(tmpCalleeParam);
    return SSA_tmpReturnArg;
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
 - 2: 60
 - 3: 60
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
