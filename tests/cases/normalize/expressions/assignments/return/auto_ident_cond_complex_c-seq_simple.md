# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> normalize > expressions > assignments > return > auto_ident_cond_complex_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $(1) ? (40, 50, $(60)) : $($(100)));
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    a = $(60);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    a = tmpCallCallee(tmpCalleeParam);
  }
  let tmpReturnArg = a;
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
function f() {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    a = $(60);
  } else {
    const tmpCalleeParam = $(100);
    a = $(tmpCalleeParam);
  }
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 60
 - 4: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same