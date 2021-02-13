# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> normalize > expressions > assignments > param_default > auto_ident_cond_c-seq_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
    const tmpIfTest$1 = $(30);
    if (tmpIfTest$1) {
      tmpNestedComplexRhs = $(60);
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
    const tmpIfTest$1 = $(30);
    if (tmpIfTest$1) {
      tmpNestedComplexRhs = $(60);
    } else {
      const tmpCalleeParam = $(100);
      tmpNestedComplexRhs = $(tmpCalleeParam);
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: undefined
 - 4: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
