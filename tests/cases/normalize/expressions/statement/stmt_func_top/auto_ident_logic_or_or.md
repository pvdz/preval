# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  $($(0)) || $($(1)) || $($(2));
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
  }
  if (tmpIfTest) {
  } else {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    tmpCallCallee$2(tmpCalleeParam$2);
  }
  $(a);
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function () {
  const a = { a: 999, b: 1000 };
  const tmpCalleeParam = $(0);
  let tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = $(tmpCalleeParam$1);
  }
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$2 = $(2);
    $(tmpCalleeParam$2);
  }
  $(a);
};
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - 6: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
