# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident cond complex s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $(1) ? (40, 50, 60) : $($(100)))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      tmpNestedComplexRhs = 60;
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = tmpParamDefault;
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
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      tmpNestedComplexRhs = 60;
    } else {
      const tmpCalleeParam = $(100);
      tmpNestedComplexRhs = $(tmpCalleeParam);
    }
    a = tmpNestedComplexRhs;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
