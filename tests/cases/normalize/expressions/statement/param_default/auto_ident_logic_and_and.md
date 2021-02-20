# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Param default > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = $($(1)) && $($(1)) && $($(2))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    p = tmpCallCallee(tmpCalleeParam);
    if (p) {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      p = tmpCallCallee$1(tmpCalleeParam$1);
    }
    if (p) {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(2);
      p = tmpCallCallee$2(tmpCalleeParam$2);
    }
  } else {
    p = $tdz$__p;
  }
}
let a = { a: 999, b: 1000 };
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
$(a);
`````

## Output

`````js filename=intro
function f($tdz$__p) {
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = $(1);
    let SSA_p = $(tmpCalleeParam);
    if (SSA_p) {
      const tmpCalleeParam$1 = $(1);
      SSA_p = $(tmpCalleeParam$1);
    }
    if (SSA_p) {
      const tmpCalleeParam$2 = $(2);
      $(tmpCalleeParam$2);
    }
  }
}
const a = { a: 999, b: 1000 };
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
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
 - 7: undefined
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
