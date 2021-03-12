# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident cond complex s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  $(1) ? (40, 50, 60) : $($(100));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  $(1) ? (40, 50, 60) : $($(100));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  const tmpIfTest = $(1);
  if (tmpIfTest) {
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpCallCallee(tmpCalleeParam);
  }
  $(a);
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  const a = { a: 999, b: 1000 };
  const tmpIfTest = $(1);
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam = $(100);
    $(tmpCalleeParam);
  }
  $(a);
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
